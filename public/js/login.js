$(document).ready(function(){
	$("#submit").on("click", function(){
		var WaitressID = $('#exampleInputEmail1').val();
		

		if (WaitressID !== ""){
			
			$.get('/api/waitress/auth/' + WaitressID, function(data){
				console.log(data);
				if(data.waitressID == WaitressID){
					sessionStorage.setItem('id', data.id);
					sessionStorage.setItem('waitressID', data.waitressID);
					window.location.href = "/main.html";
				}

			});

		} else{
			console.log("Bad User Name");
			$('.alert').show();
    		function close(){
    			$('.alert').hide();
    		}
    		setTimeout(close, 3000);
		}
	});
});