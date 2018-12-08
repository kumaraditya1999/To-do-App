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
});