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
});
