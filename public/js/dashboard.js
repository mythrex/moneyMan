let MOY = ['Jan','Feb','March','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function editExpense(event) {
	let id = $(event.target).parent().parent().attr('data-id');
	let date = new Date();
	let datestr =  date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
	let name = $(event.target).parent().find('.expense-name').text();
	let desc = $(event.target).parent().parent().find('.expense-desc').text();
	let amount = $(event.target).parent().parent().find('.expense-amount').text();
	let category = $(event.target).parent().find('.expense-category').attr('data-category');
	// console.log(expense);

	let body = `<form id="editExpense">
					<div class="form group">
						<div class="row">
							<div class="col-6">
								<div class="dropdown">
					                <a href="#" class="btn btn-default btn-simple dropdown-toggle" data-toggle="dropdown" id="editExpenseCategory">
					                  <span class="expense-category" data-category="${category}"> ${category}</span>
					                </a>
					                <ul class="dropdown-menu" aria-labelledby="editExpenseCategory">
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Bill"></span> Bill</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Borrow"></span> Borrow</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="EMI"></span> EMI</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Entertainment"></span> Entertainment</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Food & Drinks"></span> Food & Drinks</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Fuel"></span> Fuel</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Groceries"></span> Groceries</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Health"></span> Health</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Investment"></span> Investment</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Shopping"></span> Shopping</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Transfer"></span> Transfer</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Travel"></span> Travel</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Other"></span> Other</a>

					                </ul>
					            </div>
							</div><!--col-6-->
							
							<div class="col-6">
								<div class="input-group">
									<div class="input-group-addon"><span class="fa fa-user"></span></div>
									<input type="text" class="form-control" placeholder="User Name" value="${name}"/>
								</div>
							</div><!--col-6-->

							<div class="col-12">
								<div class="input-group">
									<span class="input-group-addon fa fa-sticky-note-o"></span>
									<input type="text" class="form-control" placeholder="Type some description here...." value="${desc}"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<span class="input-group-addon fa fa-inr"></span>
									<input type="number" class="form-control" placeholder="Amount" value="${amount}"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<input type="text" class="form-control date-picker" placeholder="Date" value="${datestr}" data-datepicker-color=''/>
									<div class="input-group-addon fa fa-calendar text-primary"></div>
								</div>
							</div>
							
							<div class="col-4">
								<label for="expense-checkbox">Expense: </label>
								<input id="expense-checkbox" type="checkbox" name="checkbox" class="bootstrap-switch"/>
							</div>

						</div>
					</div>
				</form>
		
		<script>
	      $(".bootstrap-switch").bootstrapSwitch();
	  </script>
	  <script>
        $(".dropdown-menu .dropdown-item").click(function(){
          var selText = $(this).html();
          $(this).parent().parent().find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        });

        $('.date-picker').each(function(){
            $(this).datepicker({
                templates:{
                    leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                    rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
                }
            }).on('show', function() {
                    $('.datepicker').addClass('open');

                    datepicker_color = $(this).data('datepicker-color');
                    if( datepicker_color.length != 0){
                        $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
                    }
                }).on('hide', function() {
                    $('.datepicker').removeClass('open');
                });
        });
    </script>
		

	`;

	modal(undefined,'Edit Expense:',body,undefined);
	$('#myModal').modal('show');
	$('#myModalPositive').click(function(event) {
		//some DB stuff
		$('#myModal').modal('hide');
	});
}

function deleteExpense(event) {
	let id = +$(event.target).parent().parent().data('id');
	let myModal = $('#mySmallModal');
	console.log(id);
	smallModal('danger','<span class="fa fa-trash"></span>','Are you sure you want to delete this expense?');
	$('#mySmallModalPositive').click(function(event) {
		//some DB Stuff.

		myModal.modal('hide');
	});
	myModal.modal('show');	
}

function addExpense(event) {
	let body = `<form id="editExpense">
					<div class="form group">
						<div class="row">
							<div class="col-6">
								<div class="dropdown">
					                <a href="#" class="btn btn-default btn-simple dropdown-toggle" data-toggle="dropdown" id="addExpenseCategory">
					                  Select a category
					                </a>
					                <ul class="dropdown-menu" aria-labelledby="addExpenseCategory">
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Bill"></span> Bill</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Borrow"></span> Borrow</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="EMI"></span> EMI</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Entertainment"></span> Entertainment</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Food & Drinks"></span> Food & Drinks</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Fuel"></span> Fuel</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Groceries"></span> Groceries</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Health"></span> Health</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Investment"></span> Investment</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Shopping"></span> Shopping</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Transfer"></span> Transfer</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Travel"></span> Travel</a>
					                    <a class="dropdown-item" href="#"><span class="expense-category" data-category="Other"></span> Other</a>

					                </ul>
					            </div>
							</div><!--col-6-->
							
							<div class="col-6">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Expense Name"/>
								</div>
							</div><!--col-6-->

							<div class="col-12">
								<div class="input-group">
									<span class="input-group-addon fa fa-sticky-note-o"></span>
									<input type="text" class="form-control" placeholder="Type some description here...."/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<span class="input-group-addon fa fa-inr"></span>
									<input type="number" class="form-control" placeholder="Amount"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<input type="text" class="form-control date-picker" placeholder="Date" data-datepicker-color=''/>
									<div class="input-group-addon fa fa-calendar text-primary"></div>
								</div>
							</div>
							
							<div class="col-4">
								<label for="expense-checkbox">Expense: </label>
								<input id="expense-checkbox" type="checkbox" name="checkbox" class="bootstrap-switch"/>
							</div>

						</div>
					</div>
				</form>
		
		<script>
	      $(".bootstrap-switch").bootstrapSwitch();
	  </script>
	  <script>
        $(".dropdown-menu .dropdown-item").click(function(){
          var selText = $(this).html();
          $(this).parent().parent().find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        });

        $('.date-picker').each(function(){
            $(this).datepicker({
                templates:{
                    leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                    rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
                }
            }).on('show', function() {
                    $('.datepicker').addClass('open');

                    datepicker_color = $(this).data('datepicker-color');
                    if( datepicker_color.length != 0){
                        $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
                    }
                }).on('hide', function() {
                    $('.datepicker').removeClass('open');
                });
        });
    </script>
	`;

	let myModal = $('#myModal');
	modal('','Add Expense',body,'');
	myModal.modal('show');
	$('#myModalPositive').click(function(event) {
		//some DB STUFF

		myModal.modal('hide');
	});
}

function drawCategoryPieChart(divId) {
	// Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawPieChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawPieChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 5],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width': 'inherit',
                       'height': 'inherit'};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(divId));
        chart.draw(data, options);
      }
}

function drawTopFiveSpends(divId) {
	// Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawBarChart);

      function drawBarChart() {
      	
      	//create data
      	var data = google.visualization.arrayToDataTable([
      			['Expense','Amount',{role: 'style'},{role: 'annotation'}],
      			['Eggs',2786,'#1b9aaa','2786'],
      			['Protein',950,'#1b9aaa','950'],
      			['Pedigree',800,'#1b9aaa','800'],
      			['Sheegul',250,'#1b9aaa','250'],

      		]);
      	var options = {'title':'Top 5 Spends',
                       'width':'inherit',
                       'height': 'inherit'};
        var chart = new google.visualization.BarChart(document.getElementById(divId));
        chart.draw(data, options);
      }
}

function drawSixMonthSpends(divId,res) {
	let response = res;
 	compArr = getLastSixConsecutiveMonths();
 	insertSumWithZero(response,compArr);

  	// Set a callback to run when the Google Visualization API is loaded.
  	google.charts.setOnLoadCallback(drawColumnChart);

  	function drawColumnChart() {
  		//making dataArray
      	let dataArr = [
      			['Month','Amount',{role: 'annotation'}],
      		];
      	for(var i = 0; i < compArr.length; i++){
      		dataArr.push([MOY[compArr[i].month - 1] , compArr[i].sum, ''+compArr[i].sum]);
      	}
      	console.log(dataArr);
      	var data = google.visualization.arrayToDataTable(dataArr);

      	var options = {'title':'Last Six Months Spends',
                       'width':'inherit',
                       'height': 'inherit'};
        var chart = new google.visualization.ColumnChart(document.getElementById(divId));
        chart.draw(data, options);
      };

}

function drawThisMonthSpends(divId,response) {
	let res = response;

	  // Set a callback to run when the Google Visualization API is loaded.
  	  google.charts.setOnLoadCallback(drawLineChart);

  	  function drawLineChart() {
  	  	//making dataArray
      	let dataArr = [['day','Amount']];
      	for(var i = 0; i < res.length; i++){
      		dataArr.push([res[i].day , res[i].sum]);
      	}

      	var data = google.visualization.arrayToDataTable(dataArr);

      	var options = {'title':'This Month Spends',
                       'width':'inherit',
                       'height': 'inherit'};
        var chart = new google.visualization.LineChart(document.getElementById(divId));
        chart.draw(data, options);

  	  }
}

$(function () {
	$('.expense-icons.fa-pencil').click(editExpense);
	$('.expense-icons.fa-trash').click(deleteExpense);
	$('#add-expense').click(addExpense);	
	
})