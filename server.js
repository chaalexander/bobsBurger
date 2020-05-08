require("dotenv").config();
const express = require("express");

const CFonts = require("cfonts");

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgerController.js");

app.use(routes);

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});

CFonts.say("WELCOME TO BOB'S BURGER", {
  font: "chrome",
  align: "center",
  colors: ["candy", "cyan", "candy"],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: "0",
  gradient: true,
  independentGradient: false,
  transitionGradient: false,
  env: "node",
});
