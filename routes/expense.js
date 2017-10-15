const express = require('express');
const router = express.Router();

const controller = require('../controllers/expense.js');


//function to get expenses by category id,tags,desc,min amount,max amount, date range, specific date
router.get('/u/expenses',controller.getExpense);

//function to get total amount spent
router.get('/u/expenses/total/',controller.getTotalExpense);

//function to get amount spent as per category or get by categoryId
router.get('/u/expenses/total/group/category',controller.getTotalExpensePerCategory);

//function to get total-expense as per months
router.get('/u/expenses/total/group/date', controller.getTotalExpensePerMonth);

//function to get expense details as per day/month/year
router.get('/u/expenses/:date_part/:expense_on',controller.getExpensesByDatePart);

//create an expense
router.post('/u/expenses', controller.createExpense);

//update the expense
router.put('/u/expenses/:id', controller.updateExpense);

//delete an expense by Id
router.delete('/u/expenses/:id', controller.deleteExpense);



module.exports = router;