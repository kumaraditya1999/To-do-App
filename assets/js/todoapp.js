$(document).ready(function(){



	$('#login-modal').click(function(){
		$('#registerModal').modal("hide");
		$('#loginModal').modal("show");
	});

	$('#register-modal').click(function(){
		$('#loginModal').modal("hide");
		$('#registerModal').modal("show");
	});

	$('#login-link').click(function(){
		$('#registerModal').modal("hide");
		$('#loginModal').modal("show");
	});

	$('#register-link').click(function(){
		$('#loginModal').modal("hide");
		$('#registerModal').modal("show");
	});
	$('#login-link').css({"cursor" : "pointer"});
	$('#register-link').css({"cursor" : "pointer"});


	$('#login-btn').click(function(e){
		e.preventDeafault();
		console.log($('#first-name').val());
	});

	$('#register-btn').click(function(e){
		e.preventDeafault();
		console.log($('#first-name').val());
	});
});