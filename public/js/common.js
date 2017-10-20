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

$(function() {
  console.log("Hello");
})
