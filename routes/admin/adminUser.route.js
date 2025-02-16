const express = require("express");
const router = express.Router();
const { User } = require("../../model/user.model");
const { Superauth } = require("../../middleware/verified");
const Order = require("../../model/order.model");

router.get("/admin/users", Superauth, async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/userTable", {
      users,
      layout: "AdminLayout",
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

router.get("/users/edit/:id", Superauth, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin/user-edit-form", { user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Error fetching user for editing");
  }
});
router.post("/users/edit/:id", Superauth, async (req, res) => {
  const userId = req.params.id;
  const { name, email, role, isVerified } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role, isVerified: isVerified === "on" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.redirect("/admin/users");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});

router.get("/users/delete/:id", Superauth, async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.redirect("/admin/users");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
});

router.get("/admin/user/orders", async (req, res) => {
  try {
    const sortOption = req.query.sort || "";
    let sortCriteria = {};

    if (sortOption === "date_asc") {
      sortCriteria = { orderDate: 1 };
    } else if (sortOption === "date_desc") {
      sortCriteria = { orderDate: -1 };
    } else if (sortOption === "price_asc") {
      sortCriteria = { totalAmount: 1 };
    } else if (sortOption === "price_desc") {
      sortCriteria = { totalAmount: -1 };
    }

    const orders = await Order.find().sort(sortCriteria);

    if (orders.length === 0) {
      return res.render("orders", { orders: [], message: "No orders found." });
    }

    res.render("orders", { layout: "AdminLayout", orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    order.status = status;
    await order.save();

    res.redirect("admin/user/orders");
  } catch (error) {
    res.status(500).send("Error updating order status");
  }
});

module.exports = router;
