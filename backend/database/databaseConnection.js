import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const pool = await mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true 
      }
});

// console.log(process.env);
console.log("MySQL database connected");
export {pool};