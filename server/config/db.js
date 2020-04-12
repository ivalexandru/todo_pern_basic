const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: "localhost",
  database: "pernstack",
  port: 5432,
});

module.exports = pool;
