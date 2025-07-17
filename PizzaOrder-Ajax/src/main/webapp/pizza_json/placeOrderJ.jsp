<%@ page contentType="text/plain; charset=utf-8"%>
<%@ page import="example.ajax.pizza.*"%>
<%@ page import="java.io.BufferedReader, java.util.*"%>
<%@ page import="org.json.simple.JSONObject, org.json.simple.parser.*"%>
<%-- <%! @SuppressWarnings("unchecked") %>  --%>
<%
BufferedReader reader = request.getReader();
StringBuilder sb = new StringBuilder();
String line;
while ((line = reader.readLine()) != null) {
    sb.append(line);
}
String jsonText = sb.toString();

JSONParser parser = new JSONParser();

try{
    JSONObject jsonObj = (JSONObject)parser.parse(jsonText);
    
    String name = (String)jsonObj.get("name");
    String address = (String)jsonObj.get("address");
    String order = (String)jsonObj.get("order");
    String phone = (String)jsonObj.get("phone");

	if (order.length() <= 0) {
		response.setStatus(400);		// bad request
  		response.addHeader("Status", "No order was received");
  		out.print(" ");
	}
	else if (address.length() <= 0) {
		response.setStatus(400);		// bad request
  		response.addHeader("Status", "No address was received");
		out.print(" ");
	} 
	else { 
		
		// application에서 "custMap" 객체를 검색하고 조회/수정 가능	

		Map<String, Customer> custMap = (Map<String, Customer>)application.getAttribute("custMap"); 
		if (custMap == null || custMap.get(phone) == null) {	 
			response.setStatus(404);		// not found
			response.addHeader("Status", "Unregistered customer");
			return;
		} 
		else {
			Customer c = custMap.get(phone);	// 고객 정보 검색
			System.out.println(c.getName());	// 콘솔에 고객 이름 출력 
			c.setRecentOrder(order); // 덮어쓰고 바꿔주기
			if(c.getRecentOrder().equals("no recentOrder")){
			    response.setStatus(404);		// not found
				response.addHeader("Status", "no recent order");
				return;	
			}
		}
		// make pizza and compute delivery time ...
		int deliveryTime = (int)(Math.random()*8 + 2);
		System.out.println("delivery time: " + deliveryTime);
		out.print(deliveryTime);
	}
} catch(ParseException e){ e.printStackTrace(); }
%>