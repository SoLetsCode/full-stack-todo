const Pool = require("pg").Pool;

const pool = new Pool({
  user: "derek",
  password: "rootroot",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
