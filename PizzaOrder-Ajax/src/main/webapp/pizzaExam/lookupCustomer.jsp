<%@ page contentType="text/plain; charset=utf-8" %>
<%@ page import="example.ajax.pizza.*,java.util.*"%>

<% 
	Customer[] customers = new Customer[3];
	customers[0] = new Customer("Doug Henderson",
	        new Address("7804 Jumping Hill Lane", "Dallas", "Texas", "75218"), 
	        "010-555-6666", "no recent order");
	customers[1] = new Customer("Mary Jenkins",
	        new Address("7081 Teakwood #24C", "Dallas", "Texas", "75182"), 
	        "010-666-7777", "no recent order");
	customers[2] = new Customer("John Jacobs",
	        new Address("234 East Rutherford Drive", "Topeka", "Kansas", "66608"), 
	        "010-777-8888", "no recent order");
	
	int i = (int)(Math.random()*3);
	Customer c = customers[i];
	out.println(c.getName());
	out.println(c.getAddress());
%>