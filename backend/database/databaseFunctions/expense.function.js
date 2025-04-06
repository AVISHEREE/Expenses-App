import { pool } from "../databaseConnection.js";

const addSingleExpense = async (user_id, amount, date, type, description) => {
  try {
    const [results] = await pool.query(
      `INSERT INTO 
                                       expenses(user_id,amount,date,type,description)
                                       VALUES(?,?,?,?,?)`,
      [user_id, amount, date, type, description],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );
    console.log(results);
    return results;
  } catch (err) {
    return err;
  }
};

const getAllExpenseForAnUser = async (userId) => {
  try {
    const [results] = await pool.query(
      `SELECT e.id , e.amount , e.date , e.type , e.description 
                                      FROM expenses e
                                      JOIN users u
                                      ON  e.user_id = u.user_id
                                      WHERE u.user_id = ?;`,
      [userId],
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

const getSingleExpense = async (expenseId) => {
  try {
    const [results] = await pool.query(
      `SELECT * FROM expenses
                                          WHERE id = ?`,
      [expenseId],
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

const deleteSingleExpense = async (expenseId) => {
  try {
    const [results] = await pool.query(
      `DELETE FROM expenses WHERE id = ?`,
      [expenseId],
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

const updateExpense = async (whatFeildToUpdate, valueToUpdate, expenseId) => {
  try {
    const results = await pool.query(
      `UPDATE expenses
                                      SET ${whatFeildToUpdate} = ? 
                                      WHERE id = ?`,
      [valueToUpdate, expenseId],
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

const searchExpenses = async (input) => {
  try {
    const query = `
          SELECT * 
          FROM expenses
          WHERE 
              (description LIKE CONCAT('%', ?, '%') OR ? IS NULL)
              OR (type LIKE CONCAT('%', ?, '%') OR ? IS NULL)
               OR (DATE_FORMAT(date, '%Y-%m-%d') LIKE CONCAT('%', ?, '%') OR ? IS NULL)
              OR (amount  LIKE CONCAT('%', ?, '%') OR ? IS NULL)
        `;

    const [results] = await pool.query(
      query,
      [
        input || null,
        input || null,
        input || null,
        input || null,
        input || null,
        input || null,
        input || null,
        input || null,
      ],
      (err) => {
        if (err) throw err;
        console.log("User inserted!");
        connection.end();
      }
    );
    console.log(results);
    return results;
  } catch (err) {
    return err;
  }
};

export {
  addSingleExpense,
  getSingleExpense,
  getAllExpenseForAnUser,
  deleteSingleExpense,
  updateExpense,
  searchExpenses,
};
