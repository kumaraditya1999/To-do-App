$(document).ready(function(){
		$("#logout-btn").click(function(e){
			console.log("clicked");
			$.post("/logout",function(data,status){
				console.log("logged out");
				console.log(status);
				if(status=="success"){
					document.location.href = '/';
				}
			});
		});

		//console.log($("#ratings span").eq(0).css("color","orange"));
		var rating=0;
		var ratingSpan = $("#ratings span");
		ratingSpan.click(function(e){
			console.log(e.target.id);
			for(var i=0;i<e.target.id;i++){
				ratingSpan.eq(i).css({"color":"orange"});
			}
			for(var i=e.target.id;i<5;i++){
				ratingSpan.eq(i).css({"color":"grey"});
			}
			rating =Number(e.target.id);
		});

		$("#add-btn").click(function(e){
			console.log("button clicked");
			var today = new Date();
			var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
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
					console.log(data);
					var title = data.title;
					var length = data.length;
					var description = data.description;
					$('#exampleModal').modal('hide');
					$("#notes").append("<div class=\"notes\" id= \"note-"+length+"\">Title : "+title+" <br>Description : "+description+"</div>");

				}
			})
		});
});