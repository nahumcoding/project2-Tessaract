$(document).ready(function(){
	var readWaitressID = sessionStorage.getItem('waitressID');
	var readOrderID = sessionStorage.getItem('orderid');
	var items = '';
	var total = [];
	var totalAmmt = 0;
	var invoice = 0;

	if(readWaitressID != null){
		console.log("welcome");
	}else{
		window.location.href = "/login.html";
	}

	console.log("orderid: " + readOrderID);
	console.log("readWaitressID: " + readWaitressID);

	$.get('/api/reciept/' + readOrderID, function(data){
		for (var i = 0; i < data.length; i++) {
			items += "<tr class='item'><td>" + data[i].itemDesc + "</td><td>"+ data[i].quantity + "</td><td>" + "$" + data[i].total + "</tr>"

			total.push(data[i].total)
			invoice = data[i].OrderId
		}
		function getSum(total, num){
    	 	return total + num;
    	 }

    	 totalAmmt = total.reduce(getSum);

		$('.heading').after(items);
		$('#total').append("$" + totalAmmt);
		$('#invoice').append("Order Number: " + invoice);
	});
	$.get('/api/waitress/auth/' + readWaitressID, function(data){

		$('#waitress').append("Waitress ID: " + data.waitressID)

	});
	sessionStorage.clear();
});