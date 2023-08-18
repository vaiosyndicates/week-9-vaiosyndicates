import express from "express";
import expenseController  from "../controller/controller";
import expenseValidator from "../util/validator";

let routerExpense = express.Router()

routerExpense.get('/expense', expenseController.getExpense)
routerExpense.get('/expense/:id', expenseController.getExpensebyId)
routerExpense.post('/expense/add', expenseValidator, expenseController.addExpense)
routerExpense.put('/expense/edit/:id', expenseValidator, expenseController.editExpense)
routerExpense.delete('/expense/delete/:id',expenseController.deleteExpense)


export { routerExpense }
