const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config.js");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// use EJS as the view engine
app.set("view engine", "ejs");
// static files
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("home", { session: req.session });
});

// Home page route
app.get("/home", (req, res) => {
  res.render("home", {
    session: req.session,
    authDisplayed: req.session.authDisplayed,
  });
});

// Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  // check if the user already exists in the database
  const existinguser = await collection.findOne({ name: data.name });

  if (existinguser) {
    res.send(
      "<script>alert('User already exists. Please enter a different username.');</script>"
    );
  } else {
    // hash the password in the database using bcrypt
    const saltRounds = 10; // the number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // replaced the hash password with original password

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("<script>alert('Username not found');</script>");
    }

    // comparing the has password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      req.session.authenticated = true;
      req.session.authDisplayed = false;
      res.redirect("/dashboard");
    } else {
      req.send("<script>alert('Wrong password');</script>");
    }
  } catch {
    res.send("<script>alert('Wrong login credentials');</script>");
  }
});

const port = 3000; // Change the port number here
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
