"use strict";

let timer_active = null,
    session_time = null,
    break_time = null;

let session_bar = new ProgressBar.Circle('#clock-timer', {
  strokeWidth: 4,
  duration: 10,
  color: '#229E74',
  trailColor: '#eee',
  trailWidth: 4,
});

let break_bar = null;

$(document).ready(function (e) {

  function get_times() {
    let status = $('#timer-value').attr('data-status');

    if(status === 'stopped'){
      session_time = {
        minutes: $('.session-item > .item-inputs .input-value').html(),
        seconds: 0
      }
      break_time = {
        minutes: $('.break-item > .item-inputs .input-value').html(),
        seconds: 0
      }
    }else if(status === 'paused'){
      console.log('Continue with paused time');
    }

    console.log(session_time, break_time);
  }

  function change_layout() {
    let status = $('#timer-value').attr('data-status');

    if(status === 'stopped' || status === 'paused'){
      $('#timer-value').attr('data-status', 'playing');

      $('#play > span').html('Pause');
      $('#play > .fas').removeClass('fa-play').addClass('fa-stop');

      $('#reset').show();
      $('.clock-settings').slideUp();
    }else if(status === 'playing'){
      $('#timer-value').attr('data-status', 'paused');

      $('#play > span').html('Start');
      $('#play > .fas').addClass('fa-play').removeClass('fa-stop');
      $('.clock-settings').slideDown();
    }
  }

  function start_timer() {

    get_times();
    change_layout();
  }

  function reset_clock() {
    timer_active = null;
    session_time = null;
    break_time = null;

    $('#timer-value').attr('data-status', 'stopped');

    $('#play > span').html('Start');
    $('#play > .fas').addClass('fa-play').removeClass('fa-stop');

    $('#minutes').html($('.setting-item .input-value').html());
    $('#seconds').html('00');

    $('#reset').hide();
    $('.clock-settings').slideDown();

    logs();
  }

  function logs(){
    console.log('Timer Active:', timer_active, 'Status :', $('#timer-value').attr('data-status'), 'Session Time:', session_time, 'Break Time:', break_time);
  }

  $('#play').on('click', function (e) {
    timer_active = 'session';

    start_timer();

    logs();
  });

  $('#reset').on('click', function (e) {
    reset_clock();
  });

  $('.input-increase').on('click', function (e) {
    let value = parseInt($(this).siblings('.input-value').html()) + 1;
    $(this).siblings('.input-value').html(value);

    reset_clock();
    get_times();
  });

  $('.input-decrease').on('click', function (e) {
    let value = parseInt($(this).siblings('.input-value').html());

    if(value > 1) {
      $(this).siblings('.input-value').html(--value);

      reset_clock();
      get_times();
    }else{
      console.log('Minimum Limit Reached');
    }
  });

});
