"use strict";

function showLoading() {
  $('#search > i').removeClass('fa-search').addClass('fa-spinner fa-spin');
}
function hideLoading() {
  $('#search > i').addClass('fa-search').removeClass('fa-spinner fa-spin');
}

function getData(value) {
  let encoded = encodeURI(value);
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${encoded}`;
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    beforeSend: function (e) {
      $('.articles-wrapper').remove();
      showLoading();
    }
  })

      .done(function (data) {
        showData(data);
      })
      .fail(function (data) {
        console.log(data);
        showNavigationError()
      })
      .always(function () {
        hideLoading();
      })

}
function showData(data) {
  let pages = data['query']['pages'];
  console.log('Pages Recieved');
  console.log(pages);

  $('.search-wrapper').after('<div class="articles-wrapper"></div>');

  for (let page in pages) {
    let title = pages[page]['title'];
    let text = pages[page]['extract'];

    let layout = '<div class="article-item-wrapper"> ' +
        '<a class="article-item" href="https://en.wikipedia.org/?curid='+ page + '" target="_blank"> ' +
        '<h2 class="article-title"> ' + title +' </h2> ' +
        '<p class="article-text"> ' + text + ' </p>' +
        '</a> ' +
        '</div>';

    $('.articles-wrapper').append(layout);
  }

  $('.viewer-container').animate({marginTop: '40px'}, 300);
  $('.articles-wrapper').addClass('animated bounceInUp').css('display', 'block');
}
function showNavigationError(msg = 'An error has been occured. Please Try Again') {
  $('.search-wrapper').after('<div class="articles-wrapper">' +
      '<div class="article-error-wrapper">' +
      '<div class="article-error">' +
      '<p class="error-text"> ' +
      msg + ' </p>' +
      '</div>' +
      '</div>' +
      '</div>');

  $('.viewer-container').animate({marginTop: '40px'}, 300);
  $('.articles-wrapper').addClass('animated fadeIn');
}

$(document).ready(function (e) {

  //reset input field
  $('.reset-value').on('click', function (e) {
    $(this).siblings('input').val('').focus();
    $('.articles-wrapper').remove();
    $('.viewer-container').animate({marginTop: '150px'});
  });

  //submitting form
  $('#search-form').on('submit', function (e) {
    event.preventDefault();
    $('#search').click();
  })
  $('#search').on('click', function (e) {
    e.preventDefault();

    let value = $('#search-article').val();
    console.log('Searching Data For: ' + value);

    if (value !== null && value !== undefined && value !== '') {
      getData(value);
    } else {
      showNavigationError('Please enter some text to search.')
    }

  })

});
