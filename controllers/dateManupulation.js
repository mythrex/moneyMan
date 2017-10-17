//function to return date + somemonth
module.exports.addMonth = (date,number)=>{
	var date2 = new Date();
	return new Date(date2.setMonth(date.getMonth() + number));
};

module.exports.getDatePart = (date)=>{
	let y = date.getFullYear();
	let m = (date.getMonth()+1) >= 10 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
	let d = (date.getDate()+1) >= 10 ? date.getDate() : '0'+(date.getDate());
	var dateString = y+'-'+m+'-'+d;
	return dateString;
};

module.exports.addDay = (date,number)=>{
	let temp_date = new Date(date);
	return new Date(temp_date.setDate(temp_date.getDate() + number));
};

module.exports.thisWeeksSunDate = function (date){
  var temp_date = date;
  return new Date(temp_date.setDate(temp_date.getDate() - temp_date.getDay()));
};
