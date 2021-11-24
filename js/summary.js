$(document).ready(function () {
        	var sumAlpaca=[];
        	var totalAlpaca=0;
        	var totalCost=0; 
        	//get alpaca list 
        	$.ajax({
			    url: "https://alpacinator.herokuapp.com/alpaca/list/info",
			    type: 'GET',
			    async: false,
			    accept: "application/json",
				      "headers": {
				     'Content-Type': 'application/x-www-form-urlencoded',
				    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
				  },
			  	success: function (data, textStatus, xhr) {
			  	   //insert alpaca_farm_id and shipping_cost in sumAlpaca array 
			       for (var i = 0; i < data.length; i++) {
			       	 sumAlpaca[i]=[data[i].alpaca_farm_id,data[i].shipping_cost];
			       }
			  	},
				error: function (xhr, status, error) {
			      return error;
			    }
			  });
        	//get farm list
        	$.ajax({
			    url: "https://alpacinator.herokuapp.com/farm/list/info",
			    method: "GET",
			    async: false,
			    accept: "application/json",
			      "headers": {
			     'Content-Type': 'application/x-www-form-urlencoded',
			    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
			  },
			    success: function (data, textStatus, xhr) {
			     //add summary table 1 rows
			     for (var i = 0; i < data.length; i++) {
			     	$('#table tr:last').after('<tr><td >'+data[i].name+'</td><td >'+countAlpacas(sumAlpaca, data[i].id)+'</td><td >'+countCost(sumAlpaca, data[i].id)+'</td></tr>');
			     	
			     }
			    
			    },
			    error: function (xhr, status, error) {
			      console.log("farm_list_error",error)
			    }
			  });
        	//add summary table 2 rows
        	$('#table1 tr:last').after('<tr><td >'+totalAlpaca+'</td><td >'+(totalCost/totalAlpaca).toFixed(2)+'</td><td >'+totalCost+'</td></tr>');
		//this is the function of count number of alpacas with alpaca list and farm id 
		function countAlpacas(arr, farmId){
    		var temp=$.grep(arr, function (elem) {
			    return elem[0] === farmId;
			}).length;
			totalAlpaca+=temp; //count total alpacas for table 2
			return temp;
		}
		//this is the function of count shipping cost with alpaca list and farm id  
		function countCost(arr, farmId){
	        	var temp=0.0;
	    		$.each(arr, function(key, info) {
	    			
			        if (info[0] == farmId) {
			           temp += parseInt(info[1]);
			           
			        }   
			    });
	    		totalCost+=temp; //count total shipping cost for table 2
			        return temp;

		}
        });