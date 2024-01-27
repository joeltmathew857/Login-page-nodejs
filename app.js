const express = require("express");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Set the session timeout in milliseconds
  })
);

app.listen(3000);

app.get("/", (req, res) => {
  res.render("login", { message: req.session.message });
});

// ... (previous code)

app.post("/login", (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
  
    // Replace the following condition with your predefined username and password
    const predefinedUsername = "joel mathew";
    const predefinedPassword = "poormanwork";
  
    if (username === predefinedUsername && password === predefinedPassword) {
      req.session.user = username;
      req.session.message = null;
      res.redirect("/home");
    } else {
      req.session.message = "Incorrect username or password";
      res.redirect("/");
    }
  });
  
  // ... (remaining code)
  

app.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home");
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
