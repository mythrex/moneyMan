$(function () {
	let res = [{
	  	day: 1,
	  	month: 4,
	  	sum: 45
	  },
	  {
	  	day: 2,
	  	month: 4,
	  	sum: 546
	  },
	  {
	  	day: 3,
	  	month: 4,
	  	sum: 454
	  },
	  {
	  	day: 6,
	  	month: 4,
	  	sum: 545
	  }];
	drawCategoryPieChart('pieChart_div');
	drawTopFiveSpends('barChart_div');
	drawSixMonthSpends('colChart_div');
	drawThisMonthSpends('lineChart_div',res);
	$(window).resize(function(event) {
		drawCategoryPieChart('pieChart_div');
		drawTopFiveSpends('barChart_div');
		drawSixMonthSpends('colChart_div');
		drawThisMonthSpends('lineChart_div',res);
	});
})