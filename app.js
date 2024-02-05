const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(nocache());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000);

app.use(
  session({
    secret: "this is the secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/");
  }
  res.render("login");
});

const data = { user: "joel", pass: "1234" };

app.post("/login", (req, res) => {
  if (data.user === req.body.name && data.pass === req.body.password) {
    req.session.isAuth = true;
    res.render("index");
    console.log(req.body);
  } else {
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.ejs"));
});

app.get("/logout", (req, res) => {
  delete req.session.isAuth;
  res.redirect("/login");
});
