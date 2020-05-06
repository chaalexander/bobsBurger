const express = require("express");

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

// router for the portuguese page
router.get("/indexBR", (req, res) => {
  burgers.all((data) => {
    const hbsObject = {
      burgers: data,
    };

    res.render("indexBR", hbsObject);
  });
});

router.post("/api/burgers", async (req, res) => {
  await burgers.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", async (req, res) => {
  const condition = "id = " + req.params.id;

  await burgers.update(
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

router.delete("/api/burgers/:id", async (req, res) => {
  const condition = "id = " + req.params.id;

  await burgers.delete(condition, (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
