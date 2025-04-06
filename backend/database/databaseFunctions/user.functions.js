import { pool } from "../databaseConnection.js";

const newUser = async (email, password, name) => {
  try {
    const [results] = await pool.query(
      `INSERT INTO 
                                        users(email,password,name)
                                        values(?,?,?)`,
      [email, password, name],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );

    return results;
  } catch (err) {
    return err;
  }
};

const existingUserCheck = async (email) => {
  try {
    const [results] = await pool.query(
      `SELECT email FROM
                                        users WHERE email = ?`,
      [email],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );

    return results;
  } catch (err) {
    return err;
  }
};

const getUser = async (email, password) => {
  try {
    const [results] = await pool.query(
      `SELECT user_id,email,mobileNumber,balance,name
                                        FROM test.users 
                                        WHERE email = ? AND password = ?`,
      [email, password],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );

    return results[0];
  } catch (err) {
    return err;
  }
};

const updateUser = async (whatFeildToUpdate, valueToUpdate, userId) => {
  try {
    const results = await pool.query(
      `UPDATE users
                                SET ${whatFeildToUpdate} = ?
                                WHERE user_id = ?`,
      [valueToUpdate, userId],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );
    return results;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (userId) => {
  try {
    await pool.query(
      `DELETE FROM expenses WHERE user_id = ?`,
      [userId],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );
    const results = await pool.query(`DELETE FROM users WHERE user_id = ?`, [
      userId,
    ]);
    return results;
  } catch (err) {
    return err;
  }
};

export { newUser, existingUserCheck, getUser, updateUser, deleteUser };
