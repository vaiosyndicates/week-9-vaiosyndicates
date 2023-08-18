import mysql from 'mysql2';
import * as dotenv from "dotenv"

dotenv.config()

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: 13691
})

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database!");
  }
});

// connection.end();
