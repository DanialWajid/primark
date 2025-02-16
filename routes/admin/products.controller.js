const express = require("express");
const router = express.Router();
const Category = require("../../model/category.model");
const Product = require("../../model/product.model");
const { uploadProductImage } = require("../../middleware/multer.middleware");
const { authMiddleware } = require("../../middleware/verified");

router.get("/admin/product-details", authMiddleware, async (req, res) => {
  try {
    console.log("role:", req.session.userRole);

    const products = await Product.find();

    return res.render("admin/products", {
      layout: "adminLayout",
      pageTitle: "Products Management",
      products: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products from the database.");
  }
});

router.post(
  "/product-details",
  authMiddleware,
  uploadProductImage.single("productImage"),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log(
        "Uploaded file path:",
        req.file ? req.file.path : "No file uploaded"
      );

      const { name, price, sizesAvailable, categoryType, itemType, colors } =
        req.body;

      const sizesArray = Array.isArray(sizesAvailable)
        ? sizesAvailable
        : sizesAvailable
        ? [sizesAvailable]
        : [];
      const colorsArray = Array.isArray(colors)
        ? colors
        : colors
        ? [colors]
        : [];

      const productImage = req.file ? req.file.path : null;

      if (!productImage) {
        return res.status(400).json({ error: "Product image is required" });
      }

      console.log("Product Data:", {
        name,
        price,
        sizesAvailable: sizesArray,
        categoryType,
        itemType,
        colors: colorsArray,
        productImage,
      });

      const product = new Product({
        name,
        price,
        sizesAvailable: sizesArray,
        categoryType,
        itemType,
        colors: colorsArray,
        productImage,
      });

      await product.save();

      console.log("Product successfully created:", product);
      res.redirect("/admin/product-details");
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  }
);

router.get("/admin/products/create", authMiddleware, (req, res) => {
  if (
    req.session.userRole !== "Admin" &&
    req.session.userRole !== "SuperAdmin"
  ) {
    return res.redirect("/");
  }
  return res.render("admin/createForm", {
    layout: "adminLayout",
    pageTitle: "Create Product",
  });
});

router.get("/admin/products/delete/:id", authMiddleware, async (req, res) => {
  if (
    req.session.userRole !== "Admin" &&
    req.session.userRole !== "SuperAdmin"
  ) {
    return res.redirect("/");
  }
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.redirect("/admin/product-details");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: " + error.message });
  }
});

router.get("/admin/products/edit/:id", authMiddleware, async (req, res) => {
  if (
    req.session.userRole !== "Admin" &&
    req.session.userRole !== "SuperAdmin"
  ) {
    return res.redirect("/");
  }
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("product not found");
    }

    res.render("admin/productEditForm", {
      layout: "adminLayout",
      pageTitle: "Edit Product",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Product: " + err.message);
  }
});
router.post(
  "/admin/products/:id",
  uploadProductImage.single("productImage"),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, sizesAvailable, categoryType, itemType, colors } =
        req.body;
      console.log("File: ", req.file ? req.file.path : "No file uploaded");
      console.log("Body: ", req.body);

      let productImage;

      if (req.file) {
        productImage = req.file.path;
      } else {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).send("Product not found");
        }
        productImage = product.productImage;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          sizesAvailable,
          categoryType,
          itemType,
          colors,
          productImage,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }

      res.redirect("/admin/product-details");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating product: " + err.message);
    }
  }
);

router.get("/get-item-types", async (req, res) => {
  const { type } = req.query;
  console.log("type", type);

  try {
    const categories = await Category.find({ type });

    const itemTypes = categories.map((category) => category.categoryName);

    res.json(itemTypes);
  } catch (error) {
    console.error("Error fetching item types:", error);
    res.status(500).json({ error: "Error fetching item types" });
  }
});
router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    res.render("partials/productDetails", {
      userEmail: req.session.userEmail,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product details: " + err.message);
  }
});

module.exports = router;
