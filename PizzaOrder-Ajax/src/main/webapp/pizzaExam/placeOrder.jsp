<%@page contentType="text/html; charset=utf-8" %>
<%
	String order = request.getParameter("order");
	String address = request.getParameter("address");
	
	if(order.length() <= 0){
	    response.setStatus(400);
	    response.addHeader("Status", "No order was received");
	    out.print(" ");
	}else if(address.length() <= 0){
	    response.setStatus(400);
	    response.addHeader("Status", "No address was received");
	    out.print(" ");
	}else{
	    int deliveryTime = (int)(Math.random()*8 + 2);
	    out.print(deliveryTime);
	}

%>