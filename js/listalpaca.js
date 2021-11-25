$(document).ready(function () {
	var table=$('#table').DataTable();
	var tempFarm=[];
	var sumAlpaca=[];
	var totalAlpaca=0;
	var totalCost=0;
	//get alpaca list
	$.ajax({  
url: "https://alpacinator.herokuapp.com/farm/list/info",
type: 'GET',
async: false,
accept: "application/json",
"headers": {
'Content-Type': 'application/x-www-form-urlencoded',
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
},
success: function (data, textStatus, xhr) {
//insert farm name and id in tempFarm array
  for (var i = 0; i < data.length; i++) {
  tempFarm[i]=[data[i].id,data[i].name];
 
  }
},
error: function (xhr, status, error) {
 return error;
}
});
   
	$.ajax({
url: "https://alpacinator.herokuapp.com/alpaca/list/info",
method: "GET",
accept: "application/json",
"headers": {
'Content-Type': 'application/x-www-form-urlencoded',
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
},
success: function (data, textStatus, xhr) {
//add Alpaca list table rows
for (var i = 0; i < data.length; i++) {
table.row.add([  
					'<td >'+data[i].name+'</td>','<td>'+data[i].weight+' kg</td>','<td><div style=\"background-color: '+data[i].color_hex+'; height:47px;\"></div></td>','<td >'+getFarmName(tempFarm, data[i].alpaca_farm_id)+'</td>','<td>'+data[i].shipping_cost+'</td>','<td class=\"checkboxtd\"><input type="checkbox" data-id=\"'+data[i].id+'\" class=\"checkbox\" id=\"shippingStatus\" name=\"shippingStatus\" ></td>','<td><button id=\"DeleteButton\" class=\"delete_button\" type=\"button\" value='+data[i].id+'>X</button></td>']).draw();
sumAlpaca[i]=[data[i].id,data[i].alpaca_farm_id,data[i].shipping_cost];
}

},

error: function (xhr, status, error) {
 console.log("farm_list_error",error)
}
});
	//delete row by clicking on delete button
	$('#table').on("click", "#DeleteButton", function() {
	var row = $(this).closest('tr');
	//condition that allow deletion if checkbox of that row is unselect
	if(row.find('.checkbox:checked').is(':checked')){
	alert("Please unselect checkbox to delete this row");
	}else{

	if (!confirm("Are you sure to delete?")) {
   return false;
}else{
var id=$(this).val();
$(this).closest("tr").remove();
$.ajax({
url: "https://alpacinator.herokuapp.com/alpaca/delete/"+id,
type: 'DELETE',
accept: "application/json",
 "headers": {
'Content-Type': 'application/x-www-form-urlencoded',
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
},
success: function (data, textStatus, xhr) {  
$('#error-msg').html("Data delete successfully");
  var x = document.getElementById("error-msg");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
},
error: function (xhr, status, error) {
 $('#error-msg').html(error);
  var x = document.getElementById("error-msg");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
});
}
}
	});
	//on selectbox change, summary table values updated
$(document).on("change", "#shippingStatus", function () {
tempAlpaca=[];
var ids = $("#table input:checkbox:checked").map(function () {
return $(this).data("id");
}).get();
var k=0;
for (var i = 0; i < sumAlpaca.length; i++) {
for (var j = 0; j < ids.length; j++) {
if(sumAlpaca[i][0]==ids[j]){
tempAlpaca[k]=sumAlpaca[i];
k++;
}
}
}
//empty summary tables
$("#table1 tbody tr").remove();
$("#table2 tbody tr").remove();
totalAlpaca=0;
totalCost=0;
//add summary table 1 rows
for (var i = 0; i < tempFarm.length; i++) {
if (countAlpacas(tempAlpaca, tempFarm[i][0])!=0) {
$('#table1 tbody').append('<tr><td >'+tempFarm[i][1]+'</td><td >'+countAlpacas(tempAlpaca, tempFarm[i][0])+'</td><td >'+countCost(tempAlpaca, tempFarm[i][0])+'</td></tr>');    
}
}
var avg=isNaN((totalCost/totalAlpaca).toFixed(2))?0:(totalCost/totalAlpaca).toFixed(2);
//add summary table 2 values
	$('#table2 tbody').append('<tr><td >'+totalAlpaca+'</td><td >'+avg+'</td><td >'+totalCost+'</td></tr>');
});
//function for get farm name with respect to farmId from farm list
	function getFarmName(arr, farmId){
	var temp="Not Found";
$.each(arr, function(key, info) {
   if (info[0] == farmId) {
	  temp = info[1];
	   return false;
   }  
});
return temp;
}
//this is the function of count number of alpacas with alpaca list and farm id
function countAlpacas(arr, farmId){
var temp=$.grep(arr, function (elem) {
return elem[1] === farmId;
}).length;
totalAlpaca+=temp; //count total alpacas for table 2
return temp;
}
//this is the function of count shipping cost with alpaca list and farm id  
function countCost(arr, farmId){
	var temp=0.0;
$.each(arr, function(key, info) {

   if (info[1] == farmId) {

	  temp += parseInt(info[2]);
	 
   }  
});
totalCost+=temp; //count total shipping cost for table 2
   return temp;

}
});