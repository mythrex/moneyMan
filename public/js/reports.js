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
	  let Sixmonths = [{
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
	drawCategoryPieChart('pieChart_div');
	drawTopFiveSpends('barChart_div');
	drawSixMonthSpends('colChart_div',Sixmonths);
	drawThisMonthSpends('lineChart_div',res);
	$(window).resize(function(event) {
		drawCategoryPieChart('pieChart_div');
		drawTopFiveSpends('barChart_div');
		drawSixMonthSpends('colChart_div',Sixmonths);
		drawThisMonthSpends('lineChart_div',res);
	});
})