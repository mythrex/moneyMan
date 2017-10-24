function getExp(f) {
	let maxDate = new Date();
	let minDate = new Date();
	minDate.setMonth(maxDate.getMonth() - 1);
	let ul = '#displayExpense';	
	$.get(`/u/expenses?limit=15&minDate=${minDate}&maxDate=${maxDate}&order=updatedAt`, function(data) {
		f(ul,data);
		$('.expense-icons.fa-pencil').click(editExpense);
		$('.expense-icons.fa-trash').click(deleteExpense);
	});	
}

function setTotalExpense(id,data) {
	$(id).text(data);
}

function getTotalExpense(f) {
	let divId = '#totalExpense_span'
	$.get('/u/expenses/total?expense=true', function(data) {
		f(divId,data);
	});
}

function getTotalExpenseThisMonth(f) {
	let divId = '#totalExpenseThisMonth_span';
	var maxDate = new Date();
	var minDate = new Date(maxDate);
	minDate.setDate(1);
	$.get(`/u/expenses/total?expense=true&minDate=${minDate}&maxDate=${maxDate}`, function(data) {
		f(divId,data);
	});
}

function drawCharts() {
	google.charts.load('current', {packages: ['corechart']});
	google.charts.setOnLoadCallback(getTotalExpenseByCategory);
	google.charts.setOnLoadCallback(getTopFiveSpends);
	google.charts.setOnLoadCallback(getLastSixMonthsSpends);
	google.charts.setOnLoadCallback(getTotalExpensePerDay);
	function getTotalExpenseByCategory() {
		$.get('/u/expenses/total/group/category', function(data) {
			let dataArr = [];
			for(total of data){
				dataArr.push([total.category.category,+total.sum])
			}
			// Create the data table.
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Category');
			data.addColumn('number', 'Spends');
			data.addRows(dataArr);
			// Set chart options
			var options = {'title':'Category Pie chart',
			'width': 'inherit',
			'height': 400};

			// Instantiate and draw our chart, passing in some options.
			var chart = new google.visualization.PieChart(document.getElementById('pieChart_div'));
			chart.draw(data, options);
		});
	}

	function getTopFiveSpends() {
		let maxDate = new Date();
		let minDate = new Date(maxDate);
		minDate.setMonth(minDate.getMonth()-1); 
		$.get(`/u/expenses?limit=5&order=amount&minDate=${minDate}&maxDate=${maxDate}&expense=true`, function(data) {
			let dataArr = [['Expense','Amount',{role: 'annotation'}]];
			for(expense of data){
				dataArr.push([expense.name,expense.amount,expense.amount]);
				//create data
				var data = google.visualization.arrayToDataTable(dataArr);
				var options = {'title':'Top 5 Spends',
				'width':'inherit',
				'height': 250};
				var chart = new google.visualization.BarChart(document.getElementById('barChart_div'));
				chart.draw(data, options);
			}				
		});
	}

	function getLastSixMonthsSpends() {
		$.get('/u/expenses/total/lastSixMonths', function(data) {
			compArr = getLastSixConsecutiveMonths();
			insertSumWithZero(data,compArr);
			let dataArr = [
			['Month','Amount',{role: 'annotation'}],
			];
			for(var i = 0; i < compArr.length; i++){
				dataArr.push([MOY[compArr[i].month - 1] , +compArr[i].sum, ''+compArr[i].sum]);
			}
			var data = google.visualization.arrayToDataTable(dataArr);

			var options = {'title':'Last Six Months Spends',
			'width':'inherit',
			'height': 200};
			var chart = new google.visualization.ColumnChart(document.getElementById('colChart_div'));
			chart.draw(data, options);
		});
	}

	function getTotalExpensePerDay() {
		$.get('/u/expenses/total/perday', function(res) {
			var data = new google.visualization.DataTable();
			data.addColumn('number', 'Sum');
			data.addColumn('number', 'This Month');
			let dataRow = [];
			let len = res.length;
			for(var i = 0; i< len-1;i++){
				dataRow.push( [+res[i].day, +res[i].sum]);
			}
			data.addRows(dataRow);
			var options = {
				   	'title':'This Month Spends',
			        'width': 'inherit',
			        'height': 250
			      };

			var chart = new google.visualization.LineChart(document.getElementById('lineChart_div'));

			chart.draw(data,options);
		});
	}
}

function refreshPage() {
	getExp(displayExpense);
	getTotalExpense(setTotalExpense);
	getTotalExpenseThisMonth(setTotalExpense);
	drawCharts();
}

$(function () {
	$('#mySmallModalPositive').click(function(event) {
		//some DB Stuff.
		let id = $('#deleteExpense_modal').data('id');
		$.ajax({
			url: '/u/expenses/'+id,
			type: 'DELETE',
			success: function(result) {
				if (result.success) {
					refreshPage();
					$('#mySmallModal').modal('hide');
				}
			}
		});
	});

	refreshPage();
	// $(window).resize(function () {
	// 	drawCharts();
	// })
})