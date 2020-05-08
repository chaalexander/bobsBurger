const mysql = require("mysql");

const connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: "localhost",
    port: 3306,
    user: process.env.USER_NAME,
    password: process.env.USER_PWD,
    database: "burger_db",
  }
);

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
