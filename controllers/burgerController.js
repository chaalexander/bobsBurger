var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers.js");

router.get("/", function (req, res) {
  burgers.all(function (data) {
    var englishBurgers = data.filter((burger) => burger.language === "en");
    var hbsObject = {
      burgers: englishBurgers,
    };

    res.render("index", hbsObject);
  });
});

// router for the portuguese page
router.get("/indexBR", function (req, res) {
  burgers.all(function (data) {
    var portuguseBurgers = data.filter((burger) => burger.language === "pt");
    var hbsObject = {
      burgers: portuguseBurgers,
    };

    res.render("indexBR", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burgers.create(
    ["burger_name", "devoured", "language"],
    [req.body.name, req.body.devoured, req.body.language],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burgers.delete(condition, (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
