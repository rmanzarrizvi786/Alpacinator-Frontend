 $(document).ready(function () {
 	var totalAlpaca=0;
        	var totalCost=0; 
        	var tempAlpaca=[]; 
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
			  	   //insert alpaca_farm_id in tempAlpaca array
			       for (var i = 0; i < data.length; i++) {
			       	 tempAlpaca[i]=data[i].alpaca_farm_id;
			       }
			  	},
				error: function (xhr, status, error) {
			      return error;
			    }
			  });

        	var table=$('#table').DataTable();
        	//get farm list
        	$.ajax({
			    url: "https://alpacinator.herokuapp.com/farm/list/info",
			    method: "GET",
			    accept: "application/json",
			      "headers": {
			     'Content-Type': 'application/x-www-form-urlencoded',
			    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
			  },
			    success: function (data, textStatus, xhr) {
			     //add farm list table rows
			     for (var i = 0; i < data.length; i++) {
                    table.row.add([   
                        '<td >'+data[i].name+'</td>','<td >'+data[i].multiplier+'</td>','<td >'+countAlpacas(tempAlpaca, data[i].id)+'</td>','<td>'+deleteButton(countAlpacas(tempAlpaca, data[i].id), data[i].id)+'</td>']).draw();
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
					var id=$(this).val(); //get delete button value
					$(this).closest("tr").remove();
					$.ajax({
				    url: "https://alpacinator.herokuapp.com/farm/delete/"+id,
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
        	//this is the function of count number of alpacas with alpaca list and farm id 
        	function countAlpacas(arr, farmId){
        		return $.grep(arr, function (elem) {
				    return elem === farmId;
				}).length;
			}
        });
 		//function for add delete button and check that only delete if "Alpacas living here" count is 0
        function deleteButton(check, id){
        	if(check==0){
        		return '<button id=\"DeleteButton\" class=\"delete_button\" type=\"button\" value=\"'+id+'\">X</button>';
        	}else{
        		return '<button class=\"delete_button_active\" type=\"button\">X</button>';
        	}
        }