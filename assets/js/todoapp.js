$(document).ready(function(){
	$("#register-btn").click(function(e){

		e.preventDefault();
		data = {
			firstname: $("#firstname").val(),
			lastname: $("#lastname").val(),
			email: $("#email").val(),
			username : $("#register-username").val(),
			password: $('#register-password').val()
		};
		var success = function(data,status){
			console.log(data);
			
		}; 
		console.log("sending request");
		$.ajax({
		  type: "POST",
		  url: '/register',
		  data: data,
		  success:success
		});

	});

	$("#login-btn").click(function(e){
		e.preventDefault();
		data = {
			username : $("#login-username").val(),
			password: $('#login-password').val()
		};

		$.post('/login',data,function(data,status){
			console.log(data);
		});
	});
});