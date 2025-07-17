function getCustomerInfo() {
	var phone = $("#phone").val();
	if (phone == "") {
		$("#address").val("");
		$("#order").val("");
	}
	else {
		$.ajax({
	 		type: "GET",
			url: "lookupCustomer.jsp?phone=" + phone,
			/* 또는 
			url: "lookupCustomer.jsp", 
			data: {"phone": phone}, 
			*/  
			dataType: "text",
			success: updatePage,
			error: function(jqXHR) {
				var message = jqXHR.getResponseHeader("Status");
				if ((message == null) || (message.length <= 0)) {
					alert("Error! Request status is " + jqXHR.status);
				} else {
					alert(message);	
				}
			}
		});
	}
}

function updatePage(address) {
	alert("response: " + address);
	/* Update the HTML web form */
	$("#order-area").show();
	$("#address").val(address);
	$("#order").focus();
}

function submitOrder() {
	var data = {
		"phone": $("#phone").val(), 
		"address": $("#address").val(), 
		"order": $("#order").val()
	};
	$.ajax({
 		type: "POST",
		url: "placeOrder.jsp",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", // default(생략 가능)
		data: data,	
		dataType: "text",
		success: showConfirmation,
		error: function(jqXHR) {
			var message = jqXHR.getResponseHeader("Status");
			if ((message == null) || (message.length <= 0)) {
				alert("Error! Request status is " + jqXHR.status);
			} else {
				alert(message);	
			}
		}
	});
}

function showConfirmation(response) {
	// Create some confirmation text
	var p = document.createElement("p");
	p.innerHTML = `Your order should arrive within ${response} minutes. Enjoy your pizza!`;
	
	// replace the form with the confirmation message
	$("#order-form").replaceWith(p);
}