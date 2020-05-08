const express = require("express");

const router = express.Router();

const burgers = require("../models/burgers.js");

router.get("/", (req, res) => {
  burgers.all((data) => {
    const englishBurgers = data.filter((burger) => burger.language === "en");
    const hbsObject = {
      burgers: englishBurgers,
    };

    res.render("index", hbsObject);
  });
});

// router for the portuguese page
router.get("/indexBR", (req, res) => {
  burgers.all((data) => {
    const portuguseBurgers = data.filter((burger) => burger.language === "pt");
    const hbsObject = {
      burgers: portuguseBurgers,
    };

    res.render("indexBR", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burgers.create(
    ["burger_name", "devoured", "language"],
    [req.body.name, req.body.devoured, req.body.language],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burgers.delete(condition, (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
