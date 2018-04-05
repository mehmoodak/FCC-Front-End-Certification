"use strict";

let timer_active = null, // control session or break
    session_time = null, // total session time in minutes and seconds
    session_time_in_seconds = null, // total session time in seconds (used for calculating remaining time and bar progress)
    session_time_elapsed = null, // total time elapsed from session
    session_interval = null, // store the interval id of session
    break_time = null, // total break time in minutes and seconds
    break_time_in_seconds = null, // total break time in seconds (used for calculating remaining time and bar progress)
    break_time_elapsed = null, // total time elapsed from break
    break_interval = null; // store the interval id of break

// show the progress bar (default session)
let progress_bar = new ProgressBar.Circle('#clock-timer', {
  strokeWidth: 4,
  duration: 10,
  color: '#229E74',
  trailColor: '#eee',
  trailWidth: 4,
});

// get element for ringing tone
let tone = document.getElementById('tone');

$(document).ready(function (e) {

  // populate the time based on the status of the clock
  // Status of the Clocks ( Stopped (initial or reset), Paused, Playing)
  function get_times() {
    let status = $('#timer-value').attr('data-status');

    if (status === 'stopped') { // then get values from the settings
      session_time = {
        minutes: $('.session-item > .item-inputs .input-value').html(),
        seconds: 0
      }
      break_time = {
        minutes: $('.break-item > .item-inputs .input-value').html(),
        seconds: 0
      }
    } else if (status === 'paused') { // then populate the values exists in the timer

      if (timer_active === 'session') { // then populate the timer values in session_time and populate settings values in break_time
        session_time = {
          minutes: parseInt($('#minutes').html()), // adding 1 for adjustment in remaining_time function
          seconds: $('#seconds').html()
        }
        break_time = {
          minutes: $('.break-item > .item-inputs .input-value').html(),
          seconds: 0
        }
      } else if (timer_active === 'break') { // then populate the timer values in break_time and populate settings values in session_time

        break_time = {
          minutes: parseInt($('#minutes').html()), // adding 1 for adjustment in remaining_time function
          seconds: $('#seconds').html()
        }
        session_time = {
          minutes: $('.session-item > .item-inputs .input-value').html(),
          seconds: 0
        }
      }
    }

    session_time_in_seconds = get_seconds(session_time); // calculate total seconds for session (useful for showing remaining time and progress bar)
    break_time_in_seconds = get_seconds(break_time); // calculate total seconds for break (useful for showing remaining time and progress bar)
  }

  // get seconds from obj having minutes and seconds (for calculating total seconds)
  function get_seconds(obj) {
    return parseInt(obj['minutes']) * 60 + parseInt(obj['seconds']);
  }

  // get time in obj having minutes and seconds (for calculating remaining time) (param => difference of elapsed and total)
  function get_time_from_seconds(seconds) {
    return {
      'minutes': parseInt(seconds / 60),
      'seconds': seconds % 60
    }
  }

  // show remaining time in the UI
  function show_remaining_time(time_elapsed) {
    let time_remaining = null;
    if (time_elapsed > 0) {
      if (timer_active === 'session') { // then get difference from session_time seconds
        time_remaining = get_time_from_seconds(session_time_in_seconds - time_elapsed);
      } else if (timer_active === 'break') { // then get difference from break_time seconds
        time_remaining = get_time_from_seconds(break_time_in_seconds - time_elapsed);
      }

      $('#minutes').html(time_remaining['minutes']);
      if (time_remaining['seconds'] < 10) { // then append 0 before the seconds
        $('#seconds').html('0' + time_remaining['seconds']);
      } else {
        $('#seconds').html(time_remaining['seconds']);
      }
    }
  }

  // changing status and layout based on the status of the clock
  function change_layout() {
    let status = $('#timer-value').attr('data-status'); // get current status

    if (status === 'stopped' || status === 'paused') { // then it means play now
      $('#timer-value').attr('data-status', 'playing');

      $('#play > span').html('Pause');
      $('#play > .fas').removeClass('fa-play').addClass('fa-stop');

      $('#reset').show();
      $('.clock-settings').slideUp();
    } else if (status === 'playing') { // then it means pause now (for reset we call reset function)
      $('#timer-value').attr('data-status', 'paused');

      $('#play > span').html('Start');
      $('#play > .fas').addClass('fa-play').removeClass('fa-stop');
      $('.clock-settings').slideDown();
    }
  }

  // Responsible for settings times, changing layouts and starting countdown
  function set_timer() {

    let status = $('#timer-value').attr('data-status');

    if (status !== 'paused') { // if paused then it means that we already have the times
      get_times(); // get time
    }
    change_layout(); // change layout according to status of the clock

    countdown(); // start the countdown
  }

  // Responsible for switching timer between session and break (called from countdown if times completed)
  function switch_timer() {
    if (timer_active === 'session') { // change to break
      timer_active = 'break'; // changing this will change all functioning

      // clearing values and interval (start from 0 if switched)
      session_time_elapsed = null;
      clearInterval(session_interval);
      session_interval = null;

      // new bar for break (having change in color)
      progress_bar.destroy();
      progress_bar = new ProgressBar.Circle('#clock-timer', {
        strokeWidth: 4,
        duration: 10,
        color: '#e53935',
        trailColor: '#eee',
        trailWidth: 4,
      });

      $('#timer-active').html('Break');

      console.log('--------- Switching from Session to Break ---------');
      countdown();
    } else if (timer_active === 'break') { // change to session
      timer_active = 'session'; // changing this will change all functioning

      // clearing values and interval (start from 0 if switched)
      break_time_elapsed = null;
      clearInterval(break_interval);
      break_interval = null;

      // new bar for session (having change in color)
      progress_bar.destroy();
      progress_bar = new ProgressBar.Circle('#clock-timer', {
        strokeWidth: 4,
        duration: 10,
        color: '#229E74',
        trailColor: '#eee',
        trailWidth: 4,
      });

      $('#timer-active').html('Session');

      console.log('--------- Switching from Break to Session ---------');
      countdown();
    }
  }

  // Responsible for countdown funcitonality and switching timers
  function countdown() {
    tone.play(); //play tone whenever countdown is called (Starting, Resuming, Switching)

    // start from session in the beginning
    if (timer_active === null) {
      timer_active = 'session';
    }

    if (timer_active === 'session') {
      session_interval = setInterval(() => {
        // increasing seconds
        if (session_time_elapsed === null) {
          session_time_elapsed = 1;
        } else {
          session_time_elapsed++;
        }

        // updating the UI
        show_remaining_time(session_time_elapsed);
        progress_bar.animate(session_time_elapsed / session_time_in_seconds); // Ranges 0 - 1

        // switch timer if completed
        if (session_time_elapsed === session_time_in_seconds) {
          switch_timer();
        }

        logs();
      }, 1000);
    } else if (timer_active === 'break') {
      break_interval = setInterval(() => {
        // increasing seconds
        if (break_time_elapsed === null) {
          break_time_elapsed = 1;
        } else {
          break_time_elapsed++;
        }

        // updating the UI
        show_remaining_time(break_time_elapsed);
        progress_bar.animate(break_time_elapsed / break_time_in_seconds);

        // switch timer if completed
        if (break_time_elapsed === break_time_in_seconds) {
          switch_timer();
        }
        logs();
      }, 1000);
    }
  }

  // Reset or Pause Clock
  function reset_clock(is_paused) {

    // Stopping Countdown
    clearInterval(break_interval);
    clearInterval(session_interval);

    if (is_paused) { // just update the UI
      $('#play > span').html('Resume');
      $('#timer-value').attr('data-status', 'paused');

      $('#reset').show();
    } else { // Resetting everything to default
      // set null if reset else we will use it to resume functionality
      timer_active = null;
      session_time = null;
      session_time_in_seconds = null;
      session_time_elapsed = null;
      session_interval = null;
      break_time = null;
      break_time_in_seconds = null;
      break_time_elapsed = null;
      break_interval = null;

      $('#timer-active').html('Session');
      $('#play > span').html('Start');
      $('#timer-value').attr('data-status', 'stopped'); // means reset or start from beginning

      $('#minutes').html($('.setting-item .input-value').html()); // get value from settings
      $('#seconds').html('00');

      if (progress_bar) {
        progress_bar.destroy();
        progress_bar = new ProgressBar.Circle('#clock-timer', {
          strokeWidth: 4,
          duration: 10,
          color: '#229E74',
          trailColor: '#eee',
          trailWidth: 4,
        });
      }
    }

    $('#play > .fas').addClass('fa-play').removeClass('fa-stop');
    $('.clock-settings').slideDown();

    logs();
  }

  // Showing necessary logs for the clock
  function logs() {
    console.group('Pomodoro Logs');
    console.log('Timer Active:', timer_active);
    console.log('Status :', $('#timer-value').attr('data-status'));
    console.log('Session Time (' + session_time_in_seconds + 's):', session_time);
    console.log('Break Time(' + break_time_in_seconds + 's):', break_time);
    console.log('Session Time Elapsed: ', session_time_elapsed);
    console.log('Break Time Elapsed: ', break_time_elapsed);
    console.groupEnd();
  }

  $('#play').on('click', function (e) {
    let status = $('#timer-value').attr('data-status');

    if (status !== 'playing') { // means play now (stopped or resume) else if playing the pause the timer
      set_timer();
    } else {
      reset_clock(true); // passing true for pausing
    }

    logs();
  });

  $('#reset').on('click', function (e) {
    reset_clock();
  });

  $('.input-increase').on('click', function (e) {
    // update the UI
    let value = parseInt($(this).siblings('.input-value').html()) + 1;
    $(this).siblings('.input-value').html(value);

    // responsible for updating the values based on the settings
    reset_clock();
  });

  $('.input-decrease').on('click', function (e) {
    // update the UI
    let value = parseInt($(this).siblings('.input-value').html());

    // only reduce if greater then 1
    if (value > 1) {
      $(this).siblings('.input-value').html(--value);

      // responsible for updating the values based on the settings
      reset_clock();
    } else {
      console.log('Minimum Limit Reached');
    }
  });

});
