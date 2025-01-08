import { addExpense , 
         getAnExpense , 
         deleteAnExpense , 
         getAllExpense ,
         updateAnExpense} from "../controller/expense.controller.js";
import { Router } from "express";
import { verifyJwtToken } from "../middleware/verifyJwtToken.js";
const router = Router();

router.route('/add-expense').post(verifyJwtToken,addExpense);
router.route('/get-expense/:id').get(verifyJwtToken,getAnExpense);
router.route('/get-all-expenses').get(verifyJwtToken,getAllExpense);
router.route('/delete-expense').delete(verifyJwtToken,deleteAnExpense);
router.route('/update-expense').put(verifyJwtToken,updateAnExpense);

export{router as expenseRouter}