function searchByCategory(event) {
	let category = getValDropdown('#expenseCategory');
	$('#categoryReportsHeader').empty().html(`<span>Showing for <span class="expense-category" data-category="${category}"> ${category}</span> </span>`)
	
}

function refreshPage() {
	
}

$(function () {
	$('#searchByCategory').click(searchByCategory);
})