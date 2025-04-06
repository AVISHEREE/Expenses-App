import { addSingleExpense , 
         getSingleExpense , 
         deleteSingleExpense ,
         getAllExpenseForAnUser ,
         updateExpense,
         searchExpenses } from "../database/databaseFunctions/expense.function.js";

const addExpense = async (req,res)=>{
    const {user_id,amount,date,type = "",description = ""} = req.body;
    if((user_id && amount && date) === ""){
        res
        .status(401)
        .json("please fill all feilds")
    }
    else{
        const Expense = await addSingleExpense(user_id,amount,date,type,description);
        console.log(Expense);
        const ExpenseDetail = await getSingleExpense(Expense.insertId)
        res
        .status(201)
        .json(ExpenseDetail);
    }
}//add an expense to DB

const getAnExpense = async (req,res)=>{
    const id = req.params.id;
    const Expense = await getSingleExpense(id);
    if(!Expense){
        res
        .status(401)
        .json("this expense id not exists");
    }
    else{
        res
        .status(201)
        .json(Expense)
    }

}//get an expense from DB

const getAllExpense = async (req,res)=>{
    const {user_id} = req.body;
    const results = await getAllExpenseForAnUser(user_id);
    if(!results[0]){
        res
        .status(201)
        .json({
            msg:"no expense exists please enter any expenses",
        })
    }
    else{
        res
        .status(201)
        .json(results)
    }
}//get all expenses from DB

const deleteAnExpense = async (req,res)=>{
    const {id} = req.body;
    const Expense = await getSingleExpense(id);
    if(!Expense){
        res
        .status(401)
        .json("This expense does not exist");
    }
    else{
        const results = await deleteSingleExpense(id);
        res
        .status(201)
        .json(results);
    }

}//delete an expense from DB

const updateAnExpense = async (req,res)=>{
    const {expenseId,whatFeildToUpdate,valueToUpdate} = req.body;
    await updateExpense(whatFeildToUpdate,valueToUpdate,expenseId);
    const result = await getSingleExpense(expenseId);
    res
    .status(201)
    .json({
        updatedExpense:result,
        whatUpdated:whatFeildToUpdate,
        whatValueUpdated:valueToUpdate,
        whichExpense:expenseId
    });
}//update an expense from DB

const searchingExpenses = async (req,res) =>{
    const {input} = req.body;
    const result = await searchExpenses(input);
    res.status(201)
    .json(result);
}

export{
    addExpense,
    getAnExpense,
    getAllExpense,
    deleteAnExpense,
    updateAnExpense,
    searchingExpenses
}