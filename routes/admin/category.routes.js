const express = require("express");
const router = express.Router();
const categoryController = require("../admin/category.controller");
const { uploadCategoryImage } = require("../../middleware/multer.middleware");
const { authMiddleware } = require("../../middleware/verified");

const Category = require("../../model/category.model");
router.post(
  "/admin/category",
  authMiddleware,
  uploadCategoryImage.single("categoryImage"),

  async (req, res) => {
    try {
      const { categoryName, type, linkName } = req.body;
      const categoryImage = req.file.path;
      const newCategory = new Category({
        categoryName,
        categoryImage,
        type,
        linkName,
      });
      await newCategory.save();
      res.redirect("/admin/category/details");
    } catch (err) {
      res.status(500).send("Error saving product: " + err.message);
    }
  }
);

router.get("/admin/category/create", authMiddleware, (req, res) => {
  return res.render("admin/categoryForm", {
    layout: "adminLayout",
    pageTitle: "Create Category",
  });
});

router.get("/admin/category/details", authMiddleware, async (req, res) => {
  try {
    const newCategory = await Category.find();

    return res.render("admin/category", {
      layout: "adminLayout",
      pageTitle: "Category Management",
      categories: newCategory,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products from the database.");
  }
});
router.get(
  "/admin/category/delete/:id",
  authMiddleware,
  categoryController.delCategory
);

router.get(
  "/admin/category/edit/:id",
  authMiddleware,
  categoryController.editCategory
);

router.post(
  "/admin/category/:id",
  uploadCategoryImage.single("categoryImage"),
  async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { categoryName, type, linkName } = req.body;
      console.log("File: ", req.file ? req.file.path : "No file uploaded");
      console.log("Body: ", req.body);

      let categoryImage;

      if (req.file) {
        categoryImage = req.file.path;
      } else {
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(404).send("Category not found");
        }
        categoryImage = category.categoryImage;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { categoryName, categoryImage, type, linkName },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).send("Category not found");
      }

      res.redirect("/admin/category/details");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating category: " + err.message);
    }
  }
);

module.exports = router;
