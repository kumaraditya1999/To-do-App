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
					var title = data.title;
					var description = data.description;
					var priority =data.priority;
					$('#exampleModal').modal('hide');
					$("#notes").append("<div class=\"notes card\"> <div class=\"card-header\"><strong>"
								+title+"</strong></div><div class=\"card-body\"><div class=\"description\">"
								+description+"</div><div class=\"priority\">"+priority+"</div></div><div class=\"card-footer\">\
								<button class=\"btn btn-default\"><i class=\"fas fa-pen\"></i></button>\
						<button class=\"btn btn-default\"><i class=\"far fa-trash-alt\"></i></button></div></div>" );


						$(".fa-trash-alt").click(function(e){
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
						$(".fa-pen").click(function(e){
							console.log($(this).parent().parent().parent().attr("id"));

						});
				}
			})
		});


		$(".fa-trash-alt").click(function(e){
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

		$(".fa-pen").click(function(e){
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
});
