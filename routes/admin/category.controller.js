const Category = require("../../model/category.model");
exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("admin/categoryEditForm", {
      layout: "adminLayout",
      pageTitle: "Edit Category",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving category: " + err.message);
  }
};

exports.delCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    await Category.findByIdAndDelete(categoryId);
    res.redirect("/admin/category/details");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: " + error.message });
  }
};
