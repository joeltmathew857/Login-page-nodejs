const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "this is the secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(3000);

app.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/");
  }
  res.render("login");
});

const data = { user: "joel", pass: "1234" };

app.post("/login", (req, res) => {
  if (data.user === req.body.name && data.pass === req.body.password) {
    res.render("index");
    console.log(req.body);
  }
  res.redirect("login");
});



app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {});
