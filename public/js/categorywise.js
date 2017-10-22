function searchByCategory(event) {
	let category = getValDropdown('#expenseCategory');
	$('#categoryReportsHeader').empty().html(`<span>Showing for <span class="expense-category" data-category="${category}"> ${category}</span> </span>`)
	
	refreshPage()
}

function refreshPage() {
	
}

$(function () {
	let res = [{
	  	year: 2017,
	  	month: 10,
	  	sum: 45
	  },
	  {
	  	year: 2017,
	  	month: 9,
	  	sum: 546
	  },
	  {
	  	year: 2017,
	  	month: 7,
	  	sum: 454
	  },
	  {
	  	year: 2017,
	  	month: 6,
	  	sum: 545
	  }];
	$('#searchByCategory').click(searchByCategory);
	drawSixMonthSpends('colChart_div',res);
	$(window).resize(function(event) {
		drawSixMonthSpends('colChart_div',res);
	});
})