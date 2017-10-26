let MOY = ['Jan','Feb','March','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function editExpenseBtn(event) {
	let s = $('#editExpense').serialize();
	let id = $('#editExpense').data('id');
	let category = getValDropdown('#editExpenseCategory');
	s = s;
	s = unescape(s);
	//some DB stuff
	$.ajax({
		url: '/u/expenses/'+id+'?'+s,
		type: 'PUT',
		data: {
			category: category
		},
		success: function(result) {
			if (result.success) {
				refreshPage();
				$('#myModal').modal('hide');
			}
		}
	});		
}

function editExpense(event) {
	let id = $(event.target).parent().parent().attr('data-id');
	let date = new Date();
	let datestr =   date.getFullYear()+ '/' +(date.getMonth()+1) + '/' + date.getDate();
	let name = $(event.target).parent().find('.expense-name').text();
	let desc = $(event.target).parent().parent().find('.expense-desc').text();
	let amount = $(event.target).parent().parent().find('.expense-amount').text();
	let category = $(event.target).parent().find('.expense-category').attr('data-category');
	let expense = $(event.target).parent().parent().data('expense');
	

	let body = `<form id="editExpense" data-id="${id}">
					<div class="form group">
						<div class="row">
							<div class="col-6">
								<div class="dropdown">
					                <a href="#" class="btn btn-default btn-simple dropdown-toggle" data-toggle="dropdown" id="editExpenseCategory"><span class="expense-category" data-category="${category}"> ${category}</span> </a>
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
									<input name="name" type="text" class="form-control" placeholder="Expense Name" value="${name}"/>
								</div>
							</div><!--col-6-->

							<div class="col-12">
								<div class="input-group">
									<span class="input-group-addon fa fa-sticky-note-o"></span>
									<input name="desc" type="text" class="form-control" placeholder="Type some description here...." value="${desc}"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<span class="input-group-addon fa fa-inr"></span>
									<input name="amount" type="number" class="form-control" placeholder="Amount" value="${amount}"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<input name="date" type="text" class="form-control date-picker" placeholder="Date" value="${datestr}" data-datepicker-color=''/>
									<div class="input-group-addon fa fa-calendar text-primary"></div>
								</div>
							</div>
							
							<div class="col-4">
								<label for="expense-checkbox">Expense: </label>
								<input id="expense-checkbox" type="checkbox" name="expense" class="bootstrap-switch" ${expense ? 'checked':''}/>
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
    </script>`;
    let footer = `<button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" id="myModalPositive-editExpense">Save</button>`;
	modal(undefined,'Edit Expense:',body,footer);
	$('#myModalPositive-editExpense').click(editExpenseBtn);
	$('#myModal').modal('show');

}

function deleteExpense(event) {
	let id = +$(event.target).parent().parent().data('id');
	let myModal = $('#mySmallModal');
	smallModal('danger',`<div id="deleteExpense_modal" data-id=${id}><span class="fa fa-trash"></span></div>`,'Are you sure you want to delete this expense?');
	myModal.modal('show');	
}

function addExpenseBtn(event) {
	let s = $('#addExpense').serialize();
	let category = getValDropdown('#addExpenseCategory');
	s = s;
	s = unescape(s);
	$.post('/u/expenses?'+s,{category: category},function(data, textStatus, xhr) {
		if (data.success) {
			refreshPage();
			$('#myModal').modal('hide');
		}
	});
}

function addExpense(event) {
	let date = new Date();
	let datestr =   date.getFullYear()+ '/' +(date.getMonth()+1) + '/' + date.getDate();
	let body = `<form id="addExpense">
					<div class="form group">
						<div class="row">
							<div class="col-6">
								<div class="dropdown">
					                <a href="#" class="btn btn-default btn-simple dropdown-toggle" data-toggle="dropdown" id="addExpenseCategory"><span class="expense-category" data-category="Other"> Other</span> </a>
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
								<div class="input-group">
									<div class="input-group-addon"><span class="fa fa-user"></span></div>
									<input name="name" type="text" class="form-control" placeholder="Expense Name"/>
								</div>
							</div><!--col-6-->

							<div class="col-12">
								<div class="input-group">
									<span class="input-group-addon fa fa-sticky-note-o"></span>
									<input name="desc" type="text" class="form-control" placeholder="Type some description here...."/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<span class="input-group-addon fa fa-inr"></span>
									<input name="amount" type="number" class="form-control" placeholder="Amount"/>
								</div>
							</div>

							<div class="col-4">
								<div class="input-group">
									<input name="date" type="text" class="form-control date-picker" placeholder="Date" value="${datestr}" data-datepicker-color=''/>
									<div class="input-group-addon fa fa-calendar text-primary"></div>
								</div>
							</div>
							
							<div class="col-4">
								<label for="expense-checkbox">Expense: </label>
								<input id="expense-checkbox" type="checkbox" name="expense" class="bootstrap-switch" checked/>
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
    </script>`;
	let footer = `<button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" id="myModalPositive-addExpense">Save</button>`;
	let myModal = $('#myModal');
	modal('','Add Expense',body,footer);
	myModal.modal('show');
	$('#myModalPositive-addExpense').click(addExpenseBtn);
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
      	// console.log(dataArr);
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

function displayExpense(ulId,data) {
	let list = '',tempData;
	for(expense of data){
		tempData = `<li class="expense-item" data-expense="${expense.expense}" data-id="${expense.id}">
                <div class="col-12">
                  <span class="expense-category" data-category="${expense.category.category}" data-toggle="tooltip" data-placement="top" title="${expense.category.category}"></span>
                  <span class="expense-name">${expense.name}</span>
                  <span data-toggle="tooltip" data-placement="top" title="Edit this." class="fa fa-pencil expense-icons"></span>
                  <span data-toggle="tooltip" data-placement="top" title="Remove this." class="fa fa-trash expense-icons"></span>
                </div>
                <div class="col-12">
                  <span class="expense-desc text-muted">${expense.desc}</span> 
                  <span class="fa fa-inr expense-amount ${expense.expense ? 'text-danger' : 'text-muted'}">${expense.amount}</span>
                </div>
                <div class="col-12 expense-item-footer">
                  <p class="text-muted expense-date">
                    ${expense.date}
                  </p>
                </div>                                  
              </li><!--expense-list-item-->`;
         list = list + tempData;
	}
	list = list + `<script> $('[data-toggle="tooltip"]').tooltip();</script>`;

	$(ulId).empty().html(list);
}
$(function () {
	$('#add-expense').click(addExpense);
})