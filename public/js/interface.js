function alertMessage(message) {
  clearTimeout(this.timeout);
  $("#alert").text(message).show();
  this.timeout = setTimeout(function() { $("#alert").hide(); }, 3000);
}

$(document).ready(function() {

  $('#expenses_table').hide();

  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.post('/', $('form').serialize(), function(data) {
      var data = JSON.parse(data);
      // $('#expenses_list').append('<li class="expense_item">Expense Type: ' + data['category'] +
      //   ' Amount: ' + data['amount'] + ' Currency: ' + data['currency'] + ' Date: ' + data['day'] + ' '
      //   + data['month'] + ' ' + data['year']);
      $('#expenses_table').append("<tr><td>" + data['project_name'] + "</td>" +
      "</td>" + "<td>" + data['project_code'] + "</td>" +
      "</td>" + "<td>" + data['amount'] + "</td>" +
      "</td>" + "<td>" + data['currency'] + "</td>" +
      "</td>" + "<td>" + data['day'] + " " + data['month'] + " " + data['year'] + "</td>" +
      "</td>" + "<td>" + data['category'] + "</td>" +
      "</td>" + "<td>" + data['description'] + "</td>" +
      "</td>" + "<td>" + data['city'] + "</td>" +
      "</td>" + "<td>" + data['country'] + "</td>" +
      "</tr>");
    });

    $('#expenses_table').show();    
  });

$('#project_name').change(function() {
    var codes = {"MOD": '000', "Sotchi": '111', "World Line": '222'};
    console.log('hello')
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
})

$('#category').change(function() {
    if ($(this).val() === 'lunch')
        if ($('#amount').val() > 6)
            alertMessage('You only have 6 pounds for lunch!')
});

});
