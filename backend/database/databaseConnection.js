import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// BUG FIX #1: Was using createConnection() — a single connection that DROPS after
// a period of inactivity (especially on cloud DBs like PlanetScale/Railway/Aiven).
// When it drops, ALL queries return an Error object instead of results.
// In the controller, isUser.length on an Error object = undefined, so
// undefined === 0 → false → always hits the "user already exists" else branch.
// FIX: Use createPool() which automatically reconnects and manages multiple connections.

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,       // max simultaneous connections
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
});

// Test connection on startup
pool.getConnection()
    .then(conn => {
        console.log("✅ MySQL database connected (pool)");
        conn.release();
    })
    .catch(err => {
        console.error("❌ MySQL connection failed:", err.message);
    });

export { pool };