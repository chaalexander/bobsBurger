const express = require("express");
const translate = require("translate");

const router = express.Router();

const burgersbr = require("../models/burgersbr.js");

router.get("/", (req, res) => {
  burgersbr.all((data) => {
    const hbsObject = {
      burgers: data,
    };

    res.render("indexbr", hbsObject);
  });
});



router.post("/api/burgersbr", async (req, res) => {
  const foo = await translate(req.body.name, {
    to:"en",
    engine: "google",
    key: process.env.KEY,
  });
  console.log(foo);
  burgersbr.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgersbr/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgersbr.update(
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

router.delete("/api/burgersbr/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burgersbr.delete(condition, (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
