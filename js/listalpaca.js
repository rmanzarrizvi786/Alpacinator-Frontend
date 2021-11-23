 $(document).ready(function () {
        	var table=$('#table').DataTable();
        	var tempFarm=[];
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
                        '<td >'+data[i].name+'</td>','<td>'+data[i].weight+' kg</td>','<td><div style=\"background-color: '+data[i].color_hex+'; height:47px;\"></div></td>','<td >'+getFarmName(tempFarm, data[i].alpaca_farm_id)+'</td>','<td>'+data[i].shipping_cost+'</td>','<td ><input type="checkbox" id=\"shippingStatus\" name=\"shippingStatus\" ></td>','<td><button id=\"DeleteButton\" class=\"delete_button\" type=\"button\" value=\"'+data[i].id+'\">X</button></td>']).draw();
			     }
			     
			    },

			    error: function (xhr, status, error) {
			      console.log("farm_list_error",error)
			    }
			  });
        	//delete row by clicking on delete button
        	$('#table').on("click", "#DeleteButton", function() {
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
        });
        //function for get farm name with respect to farmId from farm list 
        function getFarmName(tempFarm, farmId){
        	var temp=-1;
    		$.each(tempFarm, function(key, info) {
		        if (info[0] == farmId) {
		           temp = info[1];
		            return false; 
		        }   
		    });
		        return temp;
		}
        });