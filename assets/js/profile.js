$(document).ready(function(){
		$("#logout-btn").click(function(e){
			
			$.post("/logout",function(data,status){
				
				if(status=="success"){
					document.location.href = '/';
				}
			});
		});
		var ind=-1;
		//console.log($("#ratings span").eq(0).css("color","orange"));
		var rating=0;
		var ratingSpan = $("#ratings span");
		ratingSpan.click(function(e){
			var pardiv = $(this).parent().parent().parent();
			var index = $(".notes").index(pardiv);
			for(var i=0;i<e.target.id;i++){
				ratingSpan.eq(i).css({"color":"orange"});
			}
			for(var i=e.target.id;i<5;i++){
				ratingSpan.eq(i).css({"color":"grey"});
			}
			rating =Number(e.target.id);
		});

		var modRatingSpan = $("#mod-ratings span");
		modRatingSpan.click(function(e){
			var pardiv = $(this).parent().parent().parent();
			var index = $(".notes").index(pardiv);
			for(var i=0;i<e.target.id;i++){
				modRatingSpan.eq(i).css({"color":"orange"});
			}
			for(var i=e.target.id;i<5;i++){
				modRatingSpan.eq(i).css({"color":"grey"});
			}
			rating =Number(e.target.id);
			console.log(rating);
		});

		$("#add-btn").click(function(e){
			console.log("button clicked");
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var data = {
				title : $("#title").val(),
				description : $("#description").val(),
				priority : Number(rating),
				time : time,
				date :date,
			}
			$.ajax({
				type : "POST",
				url :'/profile/add',
				data : data,
				success : function(data,status){
					var title = data.title;
					var description = data.description;
					var priority =data.priority;
					$('#exampleModal').modal('hide');
					$("#notes").append("<div class=\"notes card\"> <div class=\"card-header\"><strong>"
								+title+"</strong></div><div class=\"card-body\"><div class=\"description\">"
								+description+"</div><div class=\"priority\">"+priority+"</div></div><div class=\"card-footer\">\
								<button class=\"btn btn-default\"><i class=\"fas fa-pen\"></i></button>\
						<button class=\"btn btn-default\"><i class=\"far fa-trash-alt\"></i></button></div></div>" );


						$(".notes-del").click(function(e){
							var pardiv = $(this).parent().parent().parent();
							var index = $(".notes").index(pardiv);
							console.log(index);
							data = { 
								index : Number(index),
							};
							$.ajax({
								type:"POST",
								url :'/profile/delete',
								data : data,
								success : function(data,status){
									console.log(data);
									pardiv.remove();
								}
							});
						});
						$(".notes-mod").click(function(e){
							console.log("clicked");
							var pardiv = $(this).parent().parent().parent();
							ind = $(".notes").index(pardiv);
							var title = $(this).parent().parent().prev().prev().text();
							var description = $(this).parent().parent().prev().children().eq(0).text();
							var rating = $(this).parent().parent().prev().children().eq(1).text();
							//var description = $(this).parent().parent().prev().text();
							console.log(title);
							var modmodal = $('#modificationModal');
							$("#mod-title").val(title.trim());
							$("#mod-description").val(description.trim());

							//coloring the stars
							for(var i=0;i<rating;i++){
								modRatingSpan.eq(i).css({"color":"orange"});
							}
							for(var i=rating;i<5;i++){
								modRatingSpan.eq(i).css({"color":"grey"});
							}
							rating =Number(e.target.id);
							console.log(rating);
							
							modmodal.modal('show');
							console.log(ind);

						});
				}
			})
		});


		$(".notes-del").click(function(e){
			var pardiv = $(this).parent().parent().parent();
			var index = $(".notes").index(pardiv);
			console.log(index);
			data = { 
				index : Number(index),
			};
			$.ajax({
				type:"POST",
				url :'/profile/delete',
				data : data,
				success : function(data,status){
					console.log(data);
					pardiv.remove();
				}
			});
		});

		$(".notes-mod").click(function(e){
			console.log("clicked");
			var pardiv = $(this).parent().parent().parent();
			ind = $(".notes").index(pardiv);
			var title = $(this).parent().parent().prev().prev().text();
			var description = $(this).parent().parent().prev().children().eq(0).text();
			var rating = $(this).parent().parent().prev().children().eq(1).text();
			//var description = $(this).parent().parent().prev().text();
			console.log(title);
			var modmodal = $('#modificationModal');
			$("#mod-title").val(title.trim());
			$("#mod-description").val(description.trim());

			//coloring the stars
			for(var i=0;i<rating;i++){
				modRatingSpan.eq(i).css({"color":"orange"});
			}
			for(var i=rating;i<5;i++){
				modRatingSpan.eq(i).css({"color":"grey"});
			}
			rating =Number(e.target.id);
			console.log(rating);
			
			modmodal.modal('show');
			console.log(ind);

		});

		$("#mod-btn").click(function(e){
			console.log(e);
			var today = new Date();
			var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var data = {
				title : $("#mod-title").val(),
				description : $("#mod-description").val(),
				priority : Number(rating),
				time : time,
				date :date,
				index :ind,
			};
			$.ajax({
				type : "POST",
				url : "/profile/modify",
				data : data,
				success : function(data,status){
					console.log(data);
					console.log($("#notes").children().eq(data.index));

					$("#notes").children().eq(data.index).html("<div class=\"card-header\"><strong>"
								+data.title+"</strong></div><div class=\"card-body\"><div class=\"description\">"
								+data.description+"</div><div class=\"priority\">"+data.priority+"</div></div><div class=\"card-footer\">\
								<button class=\"btn btn-default\"><i class=\"fas fa-pen\"></i></button>\
						<button class=\"btn btn-default\"><i class=\"far fa-trash-alt\"></i></button></div>");

					$('#modificationModal').modal("hide");
				}

			})
		});



		//meetings part
		$("#meeting-modal-close").click(function(e){
			$("#no-user-error").css({ "display": "none"});
			$("#no-meeting-title-error").css({ "display": "none"});
			$("#no-meeting-description-error").css({ "display": "none"});
			$("#no-meeting-with-error").css({ "display": "none"});
			$("#no-meeting-time-error").css({ "display": "none"});
			$("#no-meeting-date-error").css({ "display": "none"});
		});
		$("#meeting-add-btn").click(function(e){
			console.log("clicked");
			var done = true;
			if($("#meeting-title").val()==''){
				done = false;
				$("#no-meeting-title-error").css({ "display": "block"});
			}
			if($("#meeting-description").val()==''){
				done = false;
				$("#no-meeting-description-error").css({ "display": "block"});
			}
			if($("#meeting-with").val()==''){
				done = false;
				$("#no-meeting-with-error").css({ "display": "block"});

			}
			if($("#meeting-time").val()==''){
				done = false;
				$("#no-meeting-time-error").css({ "display": "block"});

			}
			if($("#meeting-date").val()==''){
				done = false;
				$("#no-meeting-date-error").css({ "display": "block"});

			}

			if(done){
				data ={
				title : $("#meeting-title").val(),
				description : $("#meeting-description").val(),
				with : $("#meeting-with").val(),
				time : $("#meeting-time").val(),
				date : $("#meeting-date").val(),
			}

			$.ajax({
				url : '/profile/add-meeting',
				method : "POST",
				data : data,
				success : function(data,status){
					if(data.status){
						console.log(data.title);
						console.log("here");
						
						$("#meetings").append("<div class=\"meetings card\">\
							<div class=\"card-header\">\
								<strong>"+data.title +"</strong>\
							</div>\
							<div class=\"card-body\">\
								<div class=\"description\">\
									"+data.description+"\
								</div>\
								<div class=\"with\">\
									with:"+data.with+"\
								</div>	\
								<div class=\"date\">\
									Date : "+data.date+"\
								</div>\
								<div class=\"time\">\
									Time: "+data.time+"\
								</div>\
							</div>\
							<div class=\"card-footer\">\
								<button class=\"btn btn-default\"><i class=\"fas fa-times meetings-del\"></i></button>\
							</div>\
							</div>");

						$('#meetingsModal').modal("hide");

					}else{
						console.log(data.message);
						$("#no-user-error").css({ "display": "block"});


					}
				}
			});

			}
			
		});



		$(".meetings-del").click(function(e){
			var pardiv = $(this).parent().parent().parent();
			var index = $(".meetings").index(pardiv);
			console.log(index);
			data = { 
				index : Number(index),
			};
			$.ajax({
				type:"POST",
				url :'/profile/delete-meeting',
				data : data,
				success : function(data,status){
					console.log(data);
					pardiv.remove();
				}
			});
		});

		
$("#calender-note-add").click(function(){

	$("#calenderModal").modal("hide");

});


$("#calender-appointment-add").click(function(){

	$("#calenderModal").modal("hide");

});





//CALENDER




today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);




$("#next").click(function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
});

$("#previous").click(function previous() {
	console.log("here");
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);

});


$("select").change(function () {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
});

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.

    }

    var tds = document.querySelectorAll('td');
 
        for(var j =0;j<tds.length;j++){
        	//highlight the appointments
        	var meetings = $("#meetings .meetings");

        	var dateTitle = document.getElementById('monthAndYear');
                var tempDate = dateTitle.innerHTML.split(' ');
                //console.log(tempDate);
                var year = tempDate[1];
                var month = months.indexOf(tempDate[0])+1;
                //console.log(year+"-"+month+"-"+e.toElement.innerHTML);
                var this_date2 = year+"-"+month+"-"+tds[j].innerHTML; 
    
        	var donetemp = 0;
        	for(var k=0;k<meetings.length;k++){
        		var this_date = meetings[k].children[1].children[2].innerHTML.split(' ')[2].split('\n')[0];
        		console.log(this_date);
        		
        		 
        		 if(this_date ==  this_date2){
        		 	tds[j].style.backgroundColor = "#FFDD02";
        		 }
        	}
        	
        	console.log(tds[j].innerHTML);

            tds[j].addEventListener('click',function(e){
                //console.log(e.toElement.innerHTML);
                var dateTitle = document.getElementById('monthAndYear');
                var tempDate = dateTitle.innerHTML.split(' ');
                //console.log(tempDate);
                var year = tempDate[1];
                var month = months.indexOf(tempDate[0])+1;
                //console.log(year+"-"+month+"-"+e.toElement.innerHTML);
                var this_date = year+"-"+month+"-"+e.toElement.innerHTML; 
                
                console.log();
                $("#calender-modal-body")[0].innerHTML = "";
                var meetings = $("#meetings .meetings");
                //console.log(meetings);
                var donetemp = 0;
                for(var i=0;i<meetings.length;i++){
                	var date = meetings[i].children[1].children[2].innerHTML.split(' ')[2].split('\n')[0];
                	//console.log(meetings[i].children[1].children[1]);
                	var withtemp = meetings[i].children[1].children[1].innerHTML;
                	 var timetemp = meetings[i].children[1].children[3].innerHTML;
                	 
                	 if(this_date ==  date){
                	 	$("#calender-modal-body").append("You have meeting "+withtemp+" "+timetemp+'\n');
                	 	donetemp++;
                	 }
                }
                if(donetemp==0){
                	$("#calender-modal-body").append("-- You have nothing on this date --");
                }

                $("#calenderModal").modal();
                //var("#calenderModal")
            });
        }

}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}





});
