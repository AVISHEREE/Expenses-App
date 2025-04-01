import { addExpense , 
         getAnExpense , 
         deleteAnExpense , 
         getAllExpense ,
         updateAnExpense,
         searchingExpenses } from "../controller/expense.controller.js";
import { Router } from "express";
import { verifyJwtToken } from "../middleware/verifyJwtToken.js";
const router = Router();

router.route('/add-expense').post(verifyJwtToken,addExpense);
router.route('/get-expense/:id').post(verifyJwtToken,getAnExpense);
router.route('/get-all-expenses').post(verifyJwtToken,getAllExpense);
router.route('/delete-expense').delete(verifyJwtToken,deleteAnExpense);
router.route('/update-expense').put(verifyJwtToken,updateAnExpense);
router.route('/search-expenses').post(searchingExpenses);

export{router as expenseRouter}