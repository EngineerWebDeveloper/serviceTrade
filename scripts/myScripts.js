
/**
 * getCalendar(): called when we have input on date
 * Renderning our calendar with data related to the selecgted day.
 * 
 */
function getCalendar() {
	
	const date_input = new Date($("#date").val());
	// getting the date of the first day in the month
	const date = new Date(date_input.getFullYear(),date_input.getMonth(),1);
	const days = [];
	const week_days = [{day:"Sun", id:0},{day:"Mon", id:1},{day:"Teu", id:2},
						{day:"Wed", id:3},{day:"Thu", id:4},{day:"Fri", id:5},
						{day:"Sat", id:6} 
					  ];
	//looping over the month days, and constructing days array
	while (date.getMonth() === date_input.getMonth()) {
		days.push({
			day_name: week_days[new Date(date).getDay()].day,
			day_number:new Date(date).getDate(),
			weekend_day: ["Sat","Sun"].includes(week_days[new Date(date).getDay()].day) ? true : false,
			searched_day : new Date(date_input).getDate()+1 === new Date(date).getDate() ? true : false
		});
		date.setDate(date.getDate() + 1);
	}
	
	_showCalendarTable(days, week_days);

}

/**
 * _showCalendarTable(): (helper method) Renderning our calendar with data related to the selected day.
 * days: array of objects: containing the days of the date selected and their CSS classes
 * day: string: selected day
 */
function _showCalendarTable(days, week_days){
	
	//empty the table if it's already in the DOM
	$("#table").empty();
	
	//construct the table
	if(days.length){	
		let html = '<table><tr>';

		//construct the first row containing the day names
		week_days.forEach(d =>{
			html += '<td >'+ d.day+'</td>'; 
		});

		html += '</tr><tr>';
		const first_day = week_days.filter(x=> x.day ==days[0].day_name).shift();
		// if the first day of the month is Wed for example
		// Sun, Mon, Tue should be empty
		for(i=0; i<first_day.id; i++){
			html += '<td  class = "no_border"></td>'; 
			days.unshift({day_number: null});
		}
		
		//append the day number in the month
		for(i=first_day.id; i<days.length; i++){
			//css class for each day, weekend and business days
			const class_day = days[i].searched_day ? "searched" : days[i].weekend_day ? "weekend" : "business";
			if((i)%7){
				  html += '<td class = '+class_day+' > '+(days[i].day_number) + '</td>';  
			}else if (!((i)%7) && i!=days.length){
				  html += '</tr><tr><td class = '+class_day+' > '+(days[i].day_number) + '</td>';
			}else{
				  html += '</tr>'
			}
		}
		html += '</table>';
	  
		//animation displaying the table
		$("#table").append(html).show(1000);
	}
}



