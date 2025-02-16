const express = require("express");
const router = express.Router();
const Category = require("../model/category.model");
const Product = require("../model/product.model");

router.get("/women", async (req, res) => {
  try {
    const categories = await Category.find({ type: "Women" });

    const heroContent = {
      dynamicHeading: "Women's",
    };

    const dynamicCards = categories.map((category) => ({
      link: `/category/women/${category.linkName}`,
      image: category.categoryImage,
      alt: category.categoryName,
      text: category.categoryName.toUpperCase(),
    }));

    res.render("index", { heroContent, dynamicCards });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories: " + err.message);
  }
});
router.get("/category/Women/:itemType", async (req, res) => {
  try {
    const { itemType } = req.params;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 3;
    const sortOption = req.query.sort || "";

    const heading = {
      title: itemType.charAt(0).toUpperCase() + itemType.slice(1),
      subtitle: `Our top picks for ${itemType}`,
    };

    const totalProducts = await Product.countDocuments({
      categoryType: "Women",
      itemType: itemType,
    });

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    let sortCriteria = {};
    if (sortOption === "priceAsc") {
      sortCriteria = { price: 1 };
    } else if (sortOption === "priceDesc") {
      sortCriteria = { price: -1 };
    }

    const products = await Product.find({
      categoryType: "Women",
      itemType: itemType,
    })
      .sort(sortCriteria)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const dynamicCards = products.map((product) => ({
      link: `/products/${product._id}`,
      image: product.productImage,
      alt: product.name,
      text: product.name.toUpperCase(),
      price: `£${product.price}`,
      colors: `${product.colors.length} colours`,
    }));

    res.render("productsIndex", {
      heading,
      dynamicCards,
      currentPage: page,
      totalPages,
      sort: sortOption,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error rendering category page: " + err.message);
  }
});

module.exports = router;
