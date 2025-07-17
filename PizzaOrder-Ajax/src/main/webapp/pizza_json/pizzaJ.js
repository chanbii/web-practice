function getCustomerInfo() {
	var phone = $("#phone").val();
	if (phone == "") {
		$("#address").val("");
		$("#order").val("");
	}
	else {
		$.ajax({
	 		type: "GET",
			url: "lookupCustomerJ.jsp?phone=" + phone,
			/* 또는 
			url: "lookupCustomer.jsp", 
			data: {"phone": phone}, 
			*/  
			dataType: "json", //응답 안에 포함되어야 할 데이터의 타입을 지정 -> dom tree 만들어줌
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

function updatePage(data) {
	alert("response: " + data);
	/* Update the HTML web form */
	/*$("#order-area").show();
	$("#address").val(address);
	$("#order").focus();*/
	var name = data.name
	var city = data.address.city;
	var street = data.address.street;
	var zipcode = data.address.zipCode;
	var recentOrder = data.recentOrder;
	
	var address = city + ", " + street + ", " + zipcode;
	$("#order-area").show();
	$("#order").val(recentOrder);
	$("#address").val(address);
	$("#order").focus()
	
	$("#greeting").html("Hi, " + name + "!");
}

function submitOrder() {
	var data = {
		"phone": $("#phone").val(), 
		"address": $("#address").val(), 
		"order": $("#order").val()
	};
	$.ajax({
 		type: "POST",
		url: "placeOrderJ.jsp",
		contentType: "application/json; charset=UTF-8", // default(생략 가능)
		data: JSON.stringify(data),	
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