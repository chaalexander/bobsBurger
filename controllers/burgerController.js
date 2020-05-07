const express = require("express");
const translate = require("translate");

const router = express.Router();

const burgers = require("../models/burgers.js");

router.get("/", (req, res) => {
  burgers.all((data) => {
    const hbsObject = {
      burgers: data,
    };

    res.render("index", hbsObject);
  });
});



router.post("/api/burgers", async (req, res) => {
  const foo = await translate(req.body.name, {
    to: "pt",
    engine: "google",
    key: process.env.KEY,
  });
  console.log(foo);
  burgers.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
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
