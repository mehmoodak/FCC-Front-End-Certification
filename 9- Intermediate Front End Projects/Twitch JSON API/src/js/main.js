"use strict";

//channels list to search in twitch
let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function capitalize(string) {
  return string.replace(/\b\w/g, function (l) {
    return l.toUpperCase()
  })
}

function showLoading() {
  $('.loading').show();
}
function hideLoading() {
  $('.loading').hide();
}
//show channels based on search value of radio button
function showChannels(search_query) {
  $('#twitch-channels .channel-item-wrapper').hide();
  let status = $('.search-filters .radio.active').attr('data-target');

  if (search_query) {
    let filtered = channels.filter(channel => channel.toLowerCase().indexOf(search_query) >= 0);

    console.log(filtered);
    filtered.map(channel => {
      if (status !== 'all') { // use status if given
        $('.channel-item-wrapper[data-channel=' + channel.toLowerCase() + '][data-status=' + status + ']').show();
      } else {
        $('.channel-item-wrapper[data-channel=' + channel.toLowerCase() + ']').show();
      }
    })
  } else {
    if (status !== 'all') { // use status if given
      $('.channel-item-wrapper[data-status=' + status + ']').show();
    } else {
      $('.channel-item-wrapper').show();
    }
  }
}

//get data from all channels
function getChannelsData() {
  channels.filter(channel => getStreamData(channel));
}
//get stream data (no logo if not streaming)
function getStreamData(channelID) {
  let encoded = encodeURI(channelID);
  let url = `https://wind-bow.glitch.me/twitch-api/streams/${encoded}`;
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    beforeSend: function (e) {
      showLoading();
    }
  })

      .done(function (data) {
        showStreamData(data, channelID);

        if (!data.stream) { //extra call for getting the logo of the channel
          getChannelData(channelID);
        }
        // console.log('Channel Stream : ' + channelID);
        // console.log(data);
      })
      .fail(function (data) {
        console.error(data);
        showAjaxError();
      })
      .always(function () {
        hideLoading();
      })

}
//get channels data  (for getting logo if not streaming)
function getChannelData(channelID) {
  let encoded = encodeURI(channelID);
  let url = `https://wind-bow.glitch.me/twitch-api/channels/${encoded}`;
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    beforeSend: function (e) {
    }
  })

      .done(function (data) {
        showChannelData(data, channelID.toLowerCase());
        // console.log('Channels Data : ');
        // console.log(data);
      })
      .fail(function (data) {
        console.error(data);
      })
      .always(function () {
      })

}
//show stream data of channels
function showStreamData(data, channelID) {
  let layout, status, description, logo;

  if (data.stream) {
    status = 'online';
    description = data.stream.channel.status;
    logo = data.stream.channel.logo;
  } else {
    status = 'offline';
    description = '';
    logo = 'http://via.placeholder.com/50x50';
  }

  layout = `<div class="channel-item-wrapper col-lg-4 col-md-6 col-sm-6 col-xs-12" data-channel="${channelID.toLowerCase()}" data-status="${status}">
      <a class="channel-item" href="https://www.twitch.tv/${channelID}" target="_blank">
      <div class="channel-img">
      <img src="${logo}" alt="channel logo">
      </div>
      <div class="channel-info">
      <div class="channel-name"> ${channelID}</div>
  <div class="channel-status ${status}"> ${capitalize(status)}</div>
      <div class="channel-description"> ${description}</div>
  </div>
  </a>
  </div>`;

  $('#twitch-channels').append(layout);
}
//show channel data (just logo)
function showChannelData(data, channelID) {
  let logo = data.logo;
  $('.channel-item-wrapper[data-channel=' + channelID + '] .channel-img > img').attr('src', logo);
}
//show error
function showAjaxError(msg = 'An error has been occured. Please Try Again') {
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
    showChannels($('#search-channel').val());
  });

  //submitting form
  $('#search-channel').on('keyup', function (e) {
    let value = $(this).val()
    showChannels(value.toLowerCase());
    console.log('Search Value: ' + value);
    event.preventDefault();
  })

  //submitting form (preventing submission)
  $('#search-form').on('submit', function (e) {
    event.preventDefault();
  })

  //loading channels on start
  getChannelsData();

});
