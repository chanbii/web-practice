<%@ page contentType="text/plain; charset=utf-8" %>
<%@ page import="example.ajax.pizza.*,java.util.*"%>
<%-- <%@ page import="com.fasterxml.jackson.databind.*"%>   --%>
<%-- <%! @SuppressWarnings("unchecked") %>  --%>
<%

Customer[] customers = new Customer[4];

// Set up some addresses to use
customers[0] = new Customer("Doug Henderson",
                  new Address("7804 Jumping Hill Lane",
                  "Dallas", "Texas", "75218"), "010-555-6666", "no recent order");
customers[1] = new Customer("Mary Jenkins",
                  new Address("7081 Teakwood #24C",
                  "Dallas", "Texas", "75182"), "010-666-7777", "no recent order");
customers[2] = new Customer("John Jacobs",
                  new Address("234 East Rutherford Drive",
                  "Topeka", "Kansas", "66608"), "010-777-8888", "no recent order");
customers[3] = new Customer("Happy Traum",
                  new Address("876 Links Circle",
                  "Topeka", "Kansas", "66608"), "010-888-9999", "no recent order");

//application에서 "custMap" 객체 검색
Map<String, Customer> custMap 
	= (Map<String, Customer>)application.getAttribute("custMap");  //세션과 비슷 custMap이 존재하지 않으면 null
	
if (custMap == null) {	// "custMap"이 존재하지 않으면 새로 생성
	//Set up some customers to use 
	custMap = new HashMap<String, Customer>();
	
	// 위 배열에 저장된 Customer 객체들을 custMap에 저장
	for (Customer c : customers) {      
	    custMap.put(c.getPhone(), c);       
 	} 
	
	// custMap을 application에 저장 -> placeOrder에서 사용
	application.setAttribute("custMap", custMap);	
}


String phone = request.getParameter("phone");
System.out.println("phone number: " + phone);   

/*
// Pick a customer at random
int i = (int)(Math.random()*4);
Customer_old c = customers[i];
String result = c.getName() + "\n" + c.getAddress();

System.out.println("result: " + result);   
out.clearBuffer();
out.print(result);
*/

//find a customer having the given phone number
Customer c = custMap.get(phone);	// "custMap"에서 검색
if (c != null) {				// unregistered customer	
	String result = c.getName() + "\n" + c.getAddress(); // address에 toString이 있다면 자동으로 스트링 변환
	System.out.println("result: " + result);
	out.clearBuffer();
	out.print(result);
}
else {
	response.setStatus(404);		// not found
	response.addHeader("Status", "Unregistered customer");
}


/* 간단하게 customer 객체를 출력. json 할 때 사용
// 참고: Jackson2를 이용한 object-to-JSON 변환
ObjectMapper mapper = new ObjectMapper();
String result2 = mapper.writeValueAsString(c);
System.out.println(result2);		// 변환 결과 확인
*/

%>