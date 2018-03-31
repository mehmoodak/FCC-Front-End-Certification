"use strict";

let channels = ['one', 'two', 'three', 'four', 'five', 'six']

function showChannels(){
  let filter = $('.search-filters .radio.active').attr('data-target');
  console.log('Current Filter: ' + filter);

  if(filter === 'all'){
    $('#twitch-channels .channel-item-wrapper').show();
  }else{
    $('#twitch-channels .channel-item-wrapper').hide();
    $('#twitch-channels .channel-item-wrapper[data-status=' + filter + ']').show();
  }
}
function showFilteredChannels(string){
  let filtered = channels.filter(channel => channel.indexOf(string) >= 0 );

  $('.channel-item-wrapper').hide();
  filtered.map( channel => {
    $('.channel-item-wrapper[data-channel=' + channel+ ']').show();
  })
}

function showLoading() {
  $('.loading').show();
}
function hideLoading() {
  $('.loading').hide();
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
  $('#error-wrapper').html(`<div class="channel-error">${msg}</div>`);

  $('.viewer-container').animate({marginTop: '40px'}, 300);
  $('.articles-wrapper').addClass('animated fadeIn');
}

$(document).ready(function (e) {

  //reset input field
  $('.reset-value').on('click', function (e) {
    $(this).siblings('input').val('');
    showChannels();

    e.preventDefault();
    console.log('Reset Clicked');
  });

  //search filters
  $('.radio > label').on('click', function (e) {

    //removing previously active radio
    $('.search-filters .radio input').removeAttr('checked');
    $('.search-filters .radio.active').removeClass('active');

    //activating currently clicked radio
    $(this).siblings('input').attr('checked', true);
    $(this).closest('.radio').addClass('active');

    //showing channels based on selection
    showChannels();
  });

  //submitting form
  $('#search-channel').on('keyup', function (e) {
    let value = $(this).val()
    showFilteredChannels(value);
    console.log('Search Value: ' + value);
    event.preventDefault();
  })

  //submitting form
  $('#search-form').on('submit', function (e) {
    event.preventDefault();
  })

});
