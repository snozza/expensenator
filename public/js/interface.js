var files = [];

function alertMessage(message) {
  clearTimeout(this.timeout);
  $("#alert").text(message).show();
  this.timeout = setTimeout(function() { $("#alert").hide(); }, 3000);
}

function uploadHandler(data, status, xhr) {
  var data = JSON.parse(data);
  var img;
  var fields = data.fields;
  var file_parts = data.path.split(".");
  var extension = file_parts[file_parts.length - 1];
  if(["jpg", "png", "gif"].indexOf(extension.toLowerCase()) >= 0)
    img = "<td><img src='" + data.path + "'/></td>"
  $('#expenses_table').append("<tr class='expense_item'><td>" + fields.project_name + "</td>" +
  "</td>" + "<td>" + fields.project_code + "</td>" +
  "</td>" + "<td>" + fields.amount + "</td>" +
  "</td>" + "<td>" + fields.currency + "</td>" +
  "</td>" + "<td>" + fields.day + " " + fields.month + " " + fields.year + "</td>" +
  "</td>" + "<td>" + fields.category + "</td>" +
  "</td>" + "<td>" + fields.description + "</td>" +
  "</td>" + "<td>" + fields.city + "</td>" +
  "</td>" + "<td>" + fields.country + "</td>" +
  img + "</tr>");
  $('#expenses_table').show();
}

$(document).ready(function() {

  $('#expenses_table').hide();

  $('#project_name').change(function() {
      var codes = {"MOD": '000', "Sotchi": '111', "World Line": '222'};
      $("#project_code").val(codes[$(this).val()]);
      console.log($('#project_name option:selected').text())
      });


  $('#city').change(function() {
      var cities = {"London": "UK", "Paris": "France", "New York": "USA"};
      $("#country").val(cities[$(this).val()]);
  });

  $('#amount').change(function() {
      var amount = $(this).val();
      if ($('#category :selected').val() === 'lunch')
          if (amount > 6)
              alertMessage('You only have 6 pounds for lunch!');
  });

  $('#category').change(function() {
      if ($(this).val() === 'lunch')
          if ($('#amount').val() > 6)
              alertMessage('You only have 6 pounds for lunch!')
  });

  $("#receiptImg").change(function(event) {
    console.log('hello');
    $.each(event.target.files, function(index, file) {
      var reader = new FileReader();
      reader.onload = function(event) {  
        object = {};
        object.filename = file.name;
        object.data = event.target.result;
        files.push(object);
      };  
      reader.readAsDataURL(file);
    });
  });

  $("#new_expenses").submit(function(form) {
    form.preventDefault();
    var fields = $(this).serialize();
    $.ajax({url: "/",
          type: 'POST',
          data: {fields: fields, filename: files[0].filename, data: files[0].data},
          success: uploadHandler   
    });
    files = [];   
  });

});
