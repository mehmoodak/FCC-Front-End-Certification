"use strict";

function getColor() {
  var colors = ['#F34335', '#E91E63', '#AB47BC', '#651FFF', '#5C6BC0', '#448AFF', '#00838F', '#009688',];
  return colors[Math.floor(Math.random() * colors.length)];
}
function changeColor() {
  let color = getColor();
  $('body').css('background-color', color);
  $('.btn').css('background-color', color);
  $('.quote-wrapper').css('color', color);
  $('.btn-icons').css('background-color', color);
}

function getWeather() {
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    method: 'GET',
    dataType: 'json',
    cache: false,
    beforeSend: function (e) {
      $('.loading').fadeIn();
    }
  })
      .done(function (data) {
        insertQuote(data[0]);
      })

      .fail(function (data) {
        console.error(data);
      })

      .always(function () {
        $('.loading').hide();
        changeColor();
        console.log('Ajax Completed');
      });
}
function insertWeather({title, content}) {
  // Inserting Author
  $('#author').html('- ' + title);

  //Inserting Quote
  $('#quote > p').remove();
  $('#quote').append(content);

  //Set Tweet
  setTweet(title, content)
}

function stripContent(content) {
  let element = document.createElement('div');
  element.innerHTML = content;
  return element.innerText.trim();
}

$(document).ready(function () {

});