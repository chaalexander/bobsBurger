const orm = require("../config/orm.js");

const burgersbr = {
  all: (cb) => {
    orm.all("burgersbr", (res) => {
      cb(res);
    });
  },

  create: (cols, vals, cb) => {
    orm.create("burgersbr", cols, vals, function (res) {
      cb(res);
    });
  },
  update: (objColVals, condition, cb) => {
    orm.update("burgersbr", objColVals, condition, (res) => {
      cb(res);
    });
  },
  delete: (condition, cb) => {
    orm.delete("burgersbr", condition, (res) => {
      cb(res);
    });
  },
};

module.exports = burgersbr;
