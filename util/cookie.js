const session = require("express-session");
const flash = require("connect-flash");

const sessionMiddleware = session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});

const flashMiddleware = (req, res, next) => {
  res.locals.messages = req.flash();
  next();
};

const deleteUserSession = (req, res) => {
  req.flash("success", "You have been logged out successfully!");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error while destroying session:", err);
      req.flash("error", "An error occurred while logging you out.");
      return res.redirect("/error-page");
    }
    res.redirect("/login");
  });
};

module.exports = { sessionMiddleware, flashMiddleware, deleteUserSession };
