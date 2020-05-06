var express = require("express");
const CFonts = require("cfonts");

var PORT = process.env.PORT || 7000;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

// add a if else statment so i dont have two pages server anmd app.
app.engine("handlebars", exphbs({ defaultLayout: "mainBR" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllersBR.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});

CFonts.say("BEM VINDO AO  BOB'S BURGER", {
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
