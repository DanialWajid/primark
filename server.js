const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
let server = express();
const flashMiddleware = require("./util/cookie");
const flash = require("connect-flash");
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.json());
server.use(cookieParser());

let mainPageRouter = require("./routes/route.main");
let adminProductsRouter = require("./routes/admin/products.controller");
let adminCategoryRouter = require("./routes/admin/category.routes");
let ProjectRouter = require("./routes/admin/project.controller");
let adminProjectRouter = require("./routes/admin/projdetail.controller");
let womenPageRouter = require("./routes/route.women");
let menPageRouter = require("./routes/route.men");
let kidsPageRouter = require("./routes/route.kids");
let babyPageRouter = require("./routes/route.baby");
let clickandcollectPageRouter = require("./routes/route.clickandcollect");
let homePageRouter = require("./routes/route.home");
let userRouter = require("./routes/route.user");
let AdminUserRouter = require("./routes/admin/adminUser.route");
let cartRouter = require("./routes/route.cart");

const { sessionMiddleware, deleteUserSession } = require("./util/cookie");
server.use(sessionMiddleware);
server.use(flash());
dotenv.config({ path: ".env.local" });
server.use(express.urlencoded({ extended: true }));
server.use(kidsPageRouter);

server.use(cartRouter);
server.use(mainPageRouter);
server.use(clickandcollectPageRouter);
server.use(userRouter);
server.get("/verify-email", (req, res) => {
  res.render("verify-email");
});

server.use(AdminUserRouter);
server.use(adminProductsRouter);
server.use(adminCategoryRouter);
server.use(adminProjectRouter);
server.use(ProjectRouter);
server.use(womenPageRouter);
server.use(menPageRouter);
server.use(babyPageRouter);
server.use(homePageRouter);

// .connect("mongodb+srv://danialwajid:1234@primark.fq1r4.mongodb.net/")
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected! to mongoDB"));

server.get("/myportfolio", (req, res) => {
  res.render("project");
});

server.listen(process.env.PORT, () => {
  console.log("server started at localhost : 5001");
});
