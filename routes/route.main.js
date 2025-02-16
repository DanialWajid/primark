const Product = require("../model/product.model");
const express = require("express");
const router = express.Router();

router.get("/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;

  if (!categories.map((c) => c.toLowerCase()).includes(categoryName)) {
    return res.status(404).send("Category not found");
  }

  res.render("category", { category: categoryName });
});

router.get("/main", (req, res) => {
  if (!req.session.userEmail) {
    return res.redirect("/user-login");
  }
  const heroContent = {
    dynamicHeading: "We are Primark",
    dynamicParagraph: "At Primark, there's something for everyone",
  };

  const dynamicCards = [
    {
      link: "/women",
      image: "/images/Wk 52 - Womens  - Landing Tile copy.avif",
      alt: "Women",
      text: "WOMEN",
    },
    {
      link: "/kids",
      image: "/images/Wk 52 - Kids - Landing Tile copy.avif",
      alt: "Kids",
      text: "KIDS",
    },
    {
      link: "/Click",
      image: "/images/Wk 46 - Click & Collect - Landing Tile 02_ copy.avif",
      alt: "Click & Collect",
      text: "CLICK & COLLECT",
    },
    {
      link: "/baby",
      image: "/images/Wk 52 - Baby - Landing Tile 02 copy.avif",
      alt: "Baby",
      text: "BABY",
    },
    {
      link: "/home",
      image: "/images/Wk 52 - Home  - Landing Tile copy.avif",
      alt: "Home",
      text: "HOME",
    },
    {
      link: "/men",
      image: "/images/Wk 52 - Mens - Landing Tile_ copy.avif",
      alt: "Men",
      text: "MEN",
    },
  ];

  res.render("index", { heroContent, dynamicCards });
});

module.exports = router;
