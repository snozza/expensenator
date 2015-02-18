function alertMessage(message) {
  clearTimeout(this.timeout);
  $("#alert").text(message).show();
  this.timeout = setTimeout(function() { $("#alert").hide(); }, 3000); 
}

$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.post('/', $('form').serialize(), function(data) {
      var data = JSON.parse(data);
      $('#expenses_list').append('<li class="expense_item">Expense Type: ' + data['category'] +
        ' Amount: ' + data['amount'] + ' Currency: ' + data['currency'] + ' Date: ' + data['day'] + ' '
        + data['month'] + ' ' + data['year']);
    });
  });

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
})

$('#category').change(function() {
    if ($(this).val() === 'lunch')
        if ($('#amount').val() > 6)
            alertMessage('You only have 6 pounds for lunch!')
});

});