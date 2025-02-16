const express = require("express");

const router = express.Router();

const project = require("../../model/project.model");
const { authMiddleware } = require("../../middleware/verified");

router.get("/", authMiddleware, async (req, res) => {
  console.log(req.session.userEmail);
  res.render("project");
});

router.post("/project/projectDetails", async (req, res) => {
  try {
    const projectBody = new project(req.body);

    await projectBody.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error saving product: " + err.message);
  }
});

router.get("/admin/create-project", authMiddleware, (req, res) => {
  return res.render("project/projectCreate", {
    layout: "adminLayout",
    pageTitle: "Create Project",
  });
});

module.exports = router;
