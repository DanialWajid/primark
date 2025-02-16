const express = require("express");
const router = express.Router();
const Project = require("../../model/project.model");
const { authMiddleware } = require("../../middleware/verified");

router.get("/", async (req, res) => {
  if (!req.session.userEmail) {
    return res.redirect("/user-login");
  }
  try {
    const projects = await Project.find();
    let isLoggedIn = true;
    return res.render("project", {
      layout: "Layout",
      projects: projects,
      isLoggedIn: isLoggedIn,
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("Error fetching projects from the database.");
  }
});

module.exports = router;
