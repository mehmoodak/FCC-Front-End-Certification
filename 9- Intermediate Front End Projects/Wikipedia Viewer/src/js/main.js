"use strict";

function getColor() {
  var colors = ['#F34335', '#E91E63', '#AB47BC', '#651FFF', '#5C6BC0', '#448AFF', '#00838F', '#009688',];
  return colors[Math.floor(Math.random() * colors.length)];
}
function changeColor() {
  let color = getColor();
  $('body').css('background-color', color);
  $('.btn').css('background-color', color);
  $('.search-wrapper').css('color', color);
  $('.btn-icons').css('background-color', color);
}

function showNavigationError() {
  document.querySelector(".loading").innerHTML = 'Sorry! we are unable to get the data.';
}
