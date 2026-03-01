import { pool } from "../databaseConnection.js";

// BUG FIX #2: All functions were passing a callback as 3rd argument to pool.query().
// The mysql2/PROMISE version completely IGNORES callbacks — it only returns Promises.
// Those callbacks also referenced `connection` which is never defined, so if they
// ever ran they'd crash. Removed all callbacks.
// Also: catch blocks were returning the Error object silently. The caller then did
// isUser.length on an Error → undefined → treated as "user exists". Now we THROW
// so the controller can handle it properly.

const newUser = async (email, password, name) => {
    const [results] = await pool.query(
        `INSERT INTO users(email, password, name) VALUES (?, ?, ?)`,
        [email, password, name]
    );
    return results;
};

const existingUserCheck = async (email) => {
    const [results] = await pool.query(
        `SELECT email FROM users WHERE email = ?`,
        [email]
    );
    return results;
};

const getUser = async (email, password) => {
    const [results] = await pool.query(
        `SELECT user_id, email, mobileNumber, balance, name
         FROM users
         WHERE email = ? AND password = ?`,
        [email, password]
    );
    return results[0];
};

const updateUser = async (whatFeildToUpdate, valueToUpdate, userId) => {
    // Whitelist allowed fields to prevent SQL injection
    const allowedFields = ['name', 'email', 'password', 'mobileNumber', 'balance'];
    if (!allowedFields.includes(whatFeildToUpdate)) {
        throw new Error(`Field "${whatFeildToUpdate}" is not allowed to be updated.`);
    }
    const [results] = await pool.query(
        `UPDATE users SET ${whatFeildToUpdate} = ? WHERE user_id = ?`,
        [valueToUpdate, userId]
    );
    return results;
};

const deleteUser = async (userId) => {
    await pool.query(`DELETE FROM expenses WHERE user_id = ?`, [userId]);
    const [results] = await pool.query(`DELETE FROM users WHERE user_id = ?`, [userId]);
    return results;
};

export { newUser, existingUserCheck, getUser, updateUser, deleteUser };