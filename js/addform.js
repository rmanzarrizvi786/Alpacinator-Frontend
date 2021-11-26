$(document).ready(function() {

$.ajax({
    url: "https://alpacinator.herokuapp.com/farm/list/info",
    method: "GET",
    accept: "application/json",
      "headers": {
     'Content-Type': 'application/x-www-form-urlencoded',
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
  },
    success: function (data, textStatus, xhr) {
     
     for (var i = 0; i < data.length; i++) {
      $("#farmId").append(new Option(data[i].name, data[i].id));
     }
     
    },

    error: function (xhr, status, error) {
      console.log("farm_list_error",error)
    }
  });

  $('#add_farm').submit(function(e) {
    e.preventDefault();
    var name = $('#name').val();
    var multiplier = $('#multiplier').val();
    var temp=0;
    $(".error").remove();
    if (name.length < 1) {
      $('#name').after('<span class="error">Name is required</span>');
      temp=1;
    }
    if (multiplier.length < 1) {
      $('#multiplier').after('<span class="error">multiplier is required</span>');
      temp=1;
    }else if (multiplier < 1) {
      $('#multiplier').after('<span class="error">multiplier must be positive number</span>');
      $('#multiplier').val(0);
      temp=1;
    }
    if (temp==1) 
      return false;
    else
    addFarm(name, multiplier) 
  });
    $('#add_alpaca').submit(function(e) {
    e.preventDefault();
    var name = $('#name').val();
    var weight = $('#weight').val();
    var color = $('#color').val();
    var farmId = $('#farmId').val();
    var temp=0;
    $(".error").remove();

    if (name.length < 1) {
      $('#name').after('<span class="error">Name is required</span>');
      temp=1;
    }
    if (weight.length < 1) {
      $('#weight').after('<span class="error"> weight is required</span>');
      temp=1;
    }else if (weight < 1) {
      $('#weight').after('<span class="error">weight must be positive number</span>');
      $('#weight').val(0);
      temp=1;
    }
    if (color.length < 1) {
      $('#color').after('<span class="error">Color is required</span>');
      temp=1;
    }
    if (!farmId) {
      $('#farmId').after('<span class="error">Farm is required</span>');
      temp=1;
    }
    if (temp==1) 
      return false;
    else
      addAlpaca(name, weight, color, farmId)
  });
  function addFarm(name, multiplier) {

  var data = {
      "name":  name,
      "multiplier": multiplier
  }
  $.ajax({
    url: "https://alpacinator.herokuapp.com/farm/create",
    method: "POST",
    accept: "application/json",
      "headers": {
     'Content-Type': 'application/x-www-form-urlencoded',
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
  },
    data: data,
    success: function (data, textStatus, xhr) {
      $('#success-msg').html("Data insert successfully");
      var x = document.getElementById("success-msg");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
      $('#name').val("");
      $('#multiplier').val("");
    },

    error: function (xhr, status, error) {
      $('#error-msg').html(error);
      var x = document.getElementById("error-msg");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }
  });
}
function addAlpaca(name, weight, color, farmId) {

  var data = {
      "name": name,
      "weight": weight,
      "color_hex": color,
      "alpaca_farm_id": farmId
   
  }
  $.ajax({
    url: "https://alpacinator.herokuapp.com/alpaca/create",
    method: "POST",
    accept: "application/json",
    // dataType: 'json',
      "headers": {
     'Content-Type': 'application/x-www-form-urlencoded',
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjowLjYwNzAxNTI5NTk1MTMxODksImlhdCI6MTYzNzU2ODAwOCwiZXhwIjoxNjM4MDAwMDA4fQ.5WbQkmJlANu1q8g9ih09tMlsZVgnAmXl1qHvc33ZcGw"
  },
    data: data,
    success: function (data, textStatus, xhr) {
      $('#success-msg').html("Data insert successfully");
      var x = document.getElementById("success-msg");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
      $('#name').val("");
      $('#weight').val("");
      $('#color').val("");
      $('#farmId').val("");
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
