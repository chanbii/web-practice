var request = new XMLHttpRequest();
function getCustomerInfo(){
	var phone = document.getElementById("phone").value;
	var url = "lookupCustomer.jsp?phone=" + phone;
	request.open("Get", url, true);
	request.onreadystatechange = updatePage;
	request.send();
}

function updatePage(){
	if(request.readyState == 4 && request.status == 200){
		var customerAddress = request.responseText;
		document.getElementById("address").value = customerAddress;
	}
	else{
		alert("Error! Request status is " + request.status);
	}
}

// 이러면 updatePage 필요 없어짐
function getCustomerInfoJ(){
	var phone = $("#phone").val();
	$.ajax({
		type: "GET",
		url: "lookupCustomer.jsp?phone=" + phone,
		dataType: "text",
		success: function(address){
			$("#address").val(address);
		},
		error: function(jqXHR){ alert("ERROR: " + JSON.stringify(jqXHR)); }
	});
}

function submitOrder(){
	// 입력된 주문 정보를 비동기적인 POST 요청으로 서버 프로그램(placeOrder.jsp)에 전송
	var phone = document.getElementById("phone").value;
	var address = document.getElementById("address").value;
	var order = document.getElementById("order").value;
	request.open("POST", "placeOrder.jsp", true);
	request.onreadystatechange = showConfirmation;
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send("phone=" + phone + "&address= " + escape(address) + "&order= " + escape(order));
}

function showConfirmation(){
	//확인 메시지를 생성하여 기존 form 다음에 삽입(출력)
	if(request.readyState == 4 && request.status == 200){
		var delTime = request.responseText;
		pElement = document.createElement("p");
		txtNode = document.createTextNode("Your order should arrive within " + delTime + "minutes.");
		pElement.appendChild(txtNode);
		document.getElementById("main-page").appendChild(pElement);
	}
	else{
		alert("Error! Request status is " + request.status);
	}
}

function submitOrderJ(){
	var phone = $("#phone").val();
	var address = {
	  city: $("#city").val(),
	  street: $("#street").val(),
	  zipCode: $("#zipCode").val()
	};
	var order = $("#order").val();
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=UTF-8",
		url: "placeOrder.jsp",
		data: JSON.stringify({
		  phone: phone,
		  address: address,
		  order: order
		}),
		dataType: "text",
		success: function(response){
			var p = document.createElement("p");
			p.innerHTML = `Your order should arrive ${response} within minutes.`
			$("#main-page").append(p);
		},
		error: function(jqXHR){ alert("ERROR: " + JSON.stringify(jqXHR)); }
	});
}