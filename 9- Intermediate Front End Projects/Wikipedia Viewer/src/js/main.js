"use strict";

//Extending animate.css
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

function getColor() {
  var colors = ['#F34335', '#E91E63', '#AB47BC', '#651FFF', '#5C6BC0', '#448AFF', '#00838F', '#009688',];
  return colors[Math.floor(Math.random() * colors.length)];
}
function changeColor() {
  let color = getColor();
  $('body').css('background-color', color);
  $('.results-wrapper').css('color', color);
}

function showNavigationError() {
  document.querySelector(".loading").innerHTML = 'Sorry! we are unable to get the data.';
}

function showLoading() {
  $('#search > i').removeClass('fa-search').addClass('fa-spinner fa-spin');
}

function hideLoading() {
  $('#search > i').addClass('fa-search').removeClass('fa-spinner fa-spin');
}

function showData() {
  $('.viewer-container').animate({marginTop: '40px'}, 300);
  $('.articles-wrapper').addClass('animated bounceInUp').css('display', 'block');
}

$(document).ready(function (e) {

  //reset input field
  $('.reset-value').on('click', function (e) {
    $(this).siblings('input').val('').focus();
    $('.articles-wrapper').remove();
    $('.viewer-container').animate({marginTop: '150px'});
  });

  $('#search-form').on('submit', function (e) {
    e.preventDefault();
    showLoading();
    showData();
  })

})

// changeColor();