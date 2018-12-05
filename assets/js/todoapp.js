$(document).ready(function(){
	$("#register-btn").click(function(){
		data = {
			firstname: $("#firstname").val(),
			lastname: $("#lastname").val(),
			email: $("#email").val(),
			username : $("#register-username").val(),
			password: $('#register-password').val()
		};

		$.post('/register',data,function(data,status){
			console.log(data);
		});
	});

	$("#login-btn").click(function(){
		data = {
			username : $("#login-username").val(),
			password: $('#login-password').val()
		};

		$.post('/login',data,function(data,status){
			console.log(data);
		});
	});
});