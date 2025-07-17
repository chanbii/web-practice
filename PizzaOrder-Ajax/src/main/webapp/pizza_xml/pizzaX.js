function getCustomerInfo() {
	var phone = $("#phone").val();
	if (phone == "") {
		$("#address").val("");
		$("#order").val("");
	}
	else {
		$.ajax({
	 		type: "GET",
			url: "lookupCustomerX.jsp?phone=" + phone,
			/* 또는 
			url: "lookupCustomer.jsp", 
			data: {"phone": phone}, 
			*/  
			dataType: "xml", //응답 안에 포함되어야 할 데이터의 타입을 지정 -> dom tree 만들어줌
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

function updatePage(xmlDoc) {
	alert("response: " + xmlDoc);
	/* Update the HTML web form */
	/*$("#order-area").show();
	$("#address").val(address);
	$("#order").focus();*/
	var name = xmlDoc.getElementsByTagName("name")[0].textContent; // 자바스크립트는 var
	//$(xmlDoc).find("name").first().text()
	var city = $(xmlDoc).find("address > city").text();
	var street = $(xmlDoc).find("address > street").text();
	var zipcode = $(xmlDoc).find("address > zipcode").text();
	var recentOrder = $(xmlDoc).find("recentOrder").first().text();
	
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
		url: "placeOrderX.jsp",
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