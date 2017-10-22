function modal(color,title,body,footer) {
	var modal = $('#myModal');
	var modalTitle = $('#myModalLabel');
	var modalBody = $('#myModalBody');
	var modalFooter = $('#myModalFooter');

	if(color){
		modal.addClass('modal-'+color);
	}
	if(title){
		modalTitle.text(title);
	}
	if(body){
		modalBody.empty().append(body);
	}
	if(footer){
		modalFooter.empty().append(footer);
	}
}

function smallModal(color,icon,body,footer) {
	var modal = $('#mySmallModal');
	var modalHeader = $('#mySmallModalHeader');
	var modalBody = $('#mySmallModalBody');
	var modalFooter = $('#mySmallModalFooter');

	if(color){
		modal.addClass('modal-'+color);
	}
	if(icon){
		modalHeader.empty().append(icon);
	}
	if(body){
		modalBody.empty().append(body);
	}
	if(footer){
		modalFooter.empty().append(footer);
	}
}

function getValDropdown(dropdown){
	let str = $(dropdown).text();
	return str.substr(1,str.length-2)
}

function getLastSixConsecutiveMonths() {
	var arr = [];
	let cur_date = new Date();
	let cur_year,cur_month;
	for(var i = 1; i <= 6; i++){
		cur_year = cur_date.getFullYear();
		cur_month = cur_date.getMonth();
		arr.push({year: cur_year,month: cur_month+1});
		cur_date.setMonth(cur_month - 1);
	}
	return arr;
}

function insertSumWithZero(arr, compArr) {
	let len1 = arr.length;
	let len2 = compArr.length;
	let i = 0,j = 0;
	while(i < len1){
		if((arr[i].year == compArr[j].year) && (arr[i].month == compArr[j].month) ){
			compArr[j].sum = arr[i].sum;
			i++;
			j++;
		}else{
			compArr[j].sum = 0;
			j++;
		}
	}
	while(j < len2){
		compArr[j].sum = 0;
		j++;
	}
}

$(function() {
  
})
