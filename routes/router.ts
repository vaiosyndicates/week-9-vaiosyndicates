import express from "express";
import expenseController  from "../controller/controller";
import expenseValidator from "../util/validator";

let routerExpense = express.Router()

routerExpense.get('/user/:id', expenseController.getUserbyId)
routerExpense.get('/transaction', expenseController.getExpense)
routerExpense.post('/transaction/add', expenseValidator, expenseController.addExpense)
routerExpense.put('/transaction/edit/:id', expenseValidator, expenseController.editExpense)
routerExpense.delete('/transaction/delete/:id',expenseController.deleteExpense)


export { routerExpense }
