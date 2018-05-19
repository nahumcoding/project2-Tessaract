$(document).ready(function(){
var readWaitressID = sessionStorage.getItem('id');
	if(readWaitressID != null){
		console.log("welcome");
	}else{
		window.location.href = "/login.html";
	}

    $("#submit").on("click", function(){
    	
    	console.log(readWaitressID);
    	var orderSubmission = [];
    	var order = $("#exampleInputEmail1").val();
    	var inputs = $("td > :input");
    	var inputval = [];
    	var totalQuan = 0;

    	for (var i = 0; i < inputs.length; i++) {
    		inputval.push(parseInt(inputs[i].value));
    	 }

    	 function getSum(total, num){
    	 	return total + num;
    	 }

    	 totalQuan = inputval.reduce(getSum);

    	var orderName = {
    		"OrderName": order,
    		"WaitressId": readWaitressID,
    		"waitress": readWaitressID
    	};

    	if(order.length == 0 || totalQuan == 0){
    		//console.log("error");
    		$('.alert').show();
    		function close(){
    			$('.alert').hide();
    		}
    		setTimeout(close, 3000);

    	}
    	else{
    		$.ajax({
    			type: "POST",
    			url: "/api/order",
    			data: orderName,
    			success: function(resData){
    				var id = resData.id;
					sessionStorage.setItem('orderid', id);
    				submitOrder(id);
    			}

    		});
    		function submitOrder(i){
		    	function Order(desc,quant,total,orderid) {
		    		this.itemDesc = desc;
		    		this.quantity = quant;		    
				    this.total = total;
				    this.OrderId = orderid;
				}
			   	var id = i;

				if(parseInt($('#Quantity1').val()) > 0){
					var price = 5;
					var quantity = parseInt($('#Quantity1').val());
					var total = price * quantity;
					var desc = "Bacon Hulk Buster Deluxe Burger";
					var orderid = id;

					var newOrder1 = new Order(desc, quantity, total,orderid);
					orderSubmission.push(newOrder1);
				}
				if(parseInt($('#Quantity2').val()) > 0){
					var price = 8;
					var quantity = parseInt($('#Quantity2').val());
					var total = price * quantity;
					var desc = "Peter Porker Sub";
					var orderid = id;

					var newOrder2 = new Order(desc, quantity, total,orderid);
					orderSubmission.push(newOrder2);
				}
				if(parseInt($('#Quantity3').val()) > 0){
					var price = 7;
					var quantity = parseInt($('#Quantity3').val());
					var total = price * quantity;
					var desc = "Stark Industries Burger";
					var orderid = id;

					var newOrder3 = new Order(desc, quantity, total,orderid);
					orderSubmission.push(newOrder3);
				}
				if(parseInt($('#Quantity4').val()) > 0){
					var price = 5;
					var quantity = parseInt($('#Quantity4').val());
					var total = price * quantity;
					var desc = "Star Lord Beef Sandwitch";
					var orderid = id;

					var newOrder4 = new Order(desc, quantity, total,orderid);
					orderSubmission.push(newOrder4);
				}				
				if(parseInt($('#Quantity5').val()) > 0){
					var price = 6;
					var quantity = parseInt($('#Quantity5').val());
					var total = price * quantity;
					var desc = "Spider-Ham Sandwitch";
					var orderid = id;

					var newOrder5 = new Order(desc, quantity.toString(), total.toString(),orderid.toString());
					orderSubmission.push(newOrder5);
				}
				//console.log(JSON.stringify(orderSubmission));
				if(orderSubmission.length !== 0){
					var igotthis = {"order": orderSubmission};

					$.ajax({
						type: "POST",
		    			url: "/api/orderitems",
		    			data: igotthis,
		    			success: function (resData){
		    				console.log(JSON.stringify(resData));
		    				console.log(JSON.stringify(orderSubmission));
		    				window.location.href = "/invoice.html";

		    			}
					});	
				}else{
					console.log("error, No items!")
				}
			}	
    	}
	});
});