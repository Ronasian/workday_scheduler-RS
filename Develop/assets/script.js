// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  var slotDivs = $('.container-lg').children();
  var date = $('#currentDay');
  // display the current date in the header of the page.
  date.text(dayjs().format('dddd, MMMM D, YYYY'));
  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  $('.fa-save').click(function () {
    var time = $(this).parent().parent().attr('id');
    var inputValue = $(this).parent().siblings('textarea')[0].value;
    localStorage.setItem(time, inputValue);
  });
  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $(slotDivs).each(function () {
    var key = $(this).attr('id');
    var value = localStorage.getItem(key);
    $(this).children('textarea').val(value);
    // Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour.
    var currentHour = dayjs().hour();
    var slotHour = key.split('-')[1];
    var testHour = 13;
    // checks if slot is past
    if (slotHour < currentHour) {
      $(this).addClass('past');
    // checks if slot is present (slotHour: integer / currentHour: string)
    } else if (slotHour == currentHour) {
      $(this).removeClass('future');
      $(this).addClass('present');
    } else {
    // checks if slot is future
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });