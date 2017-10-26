const express = require('express');
const router = express.Router();

const controller = require('../controllers/expense.js');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { 
      return next();
  }
  res.redirect('/');
}

//function to get expenses by category id,tags,desc,min amount,max amount, date range, specific date
router.get('/u/expenses',isLoggedIn,controller.getExpense);

//function to get total amount spent
router.get('/u/expenses/total/',isLoggedIn,controller.getTotalExpense);

//function to get amount spent as per category or get by categoryId
router.get('/u/expenses/total/group/category',isLoggedIn,controller.getTotalExpensePerCategory);

//function to get total-expense as per months
router.get('/u/expenses/total/group/date', isLoggedIn,controller.getTotalExpensePerMonth);

//get total expenses of last six months
router.get('/u/expenses/total/lastSixMonths',isLoggedIn,controller.getTotalExpenseLastSixMonths);

//get total expenses Per Day
router.get('/u/expenses/total/perDay',isLoggedIn,controller.getTotalExpensePerDay);

//function to get total spend of this week
router.get('/u/expenses/total/thisweek',isLoggedIn,controller.getTotalExpenseThisWeek);

//function to get total spend of this week
router.get('/u/expenses/total/weekdays',isLoggedIn,controller.getTotalExpenseWeekdays);

//function to get expense details as per day/month/year
router.get('/u/expenses/:date_part/:expense_on',isLoggedIn,controller.getExpensesByDatePart);

//create an expense
router.post('/u/expenses', isLoggedIn,controller.createExpense);

//update the expense
router.put('/u/expenses/:id', isLoggedIn,controller.updateExpense);

//delete an expense by Id
router.delete('/u/expenses/:id', isLoggedIn,controller.deleteExpense);



module.exports = router;