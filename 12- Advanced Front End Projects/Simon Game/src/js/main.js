"use strict";

$(document).ready(function (e) {

  let gameStatus = 'off'; // tunr the game on or off
  let count = 0; // count of steps currently reached
  let steps = null; // to track all of the steps
  let currentStep = null; // array of current steps to display or evaluate (useful for repeatition when error)
  let stepPart = null; // get just one part of the current step to show the steps (useful for blinking animation on the last pressed button when game is completed)
  let stepInterval = null; // for showing current steps one by one to the user
  let displayInterval = null; // blinking animation on turning on and off the display i.e. counter
  let isWaiting = true // if game is waiting for user feedback after showing the steps (keep user away to interfere in between when the steps are showing to the user)
  let userInput = [] // for storing user inputs because it is better to not to change the current step array because we can need it to display the steps again on error.
  let isStrictMode = false; // for strict mode
  let isComplete = false; // for completion (restrict user for further interactions)

  // Animation of counter and last pressed button
  function displayAnimation(value = '- -') {
    $('#count').html(value);
    let hideAndSeek = 0; // for keeping track of blink animation (turn off after few)

    displayInterval = setInterval(function (e) {
      $('.simon-display').toggleClass('on'); // blink animation on counter
      // blink last step if complete
      (isComplete) ? $('.simon-button[data-button-number="' + stepPart + '"]').toggleClass('light') : null;

      if (hideAndSeek >= 3) { //back to normal after blink animation
        $('.simon-display').addClass('on');
        (isComplete) ? $('.simon-button.light').removeClass('light') : null;
        //clear the animaiton
        clearInterval(displayInterval);
      }
      hideAndSeek++;
    }, 400);
  }

  // Initializing the steps array
  // - Only renew when first start or in strict mode
  function initializingGame() {
      steps = [];
      for (let i = 0; i < 20; i++) {
        let step = Math.floor((Math.random() * 4) + 1);
        steps.push(step);
    }

    displayAnimation('- -'); // show counter animation on game start
  }

  // Step through the game one by one (increasing one step each time and show it when this is called)
  // - isAgain -> for show again if case of any error
  function gameStepping(isAgain = false) {

    // Setting the new current steps from the steps array and if steps exceed than 20 then show WINNING MSG
    function setNewSteps() {
      currentStep = [];
      if (count < 10) { // set new steps
        for (var i = 0; i < count + 1; i++) {
          currentStep.push(steps[i]);
        }
        count++;
      } else { // show complete msg
        isComplete = true;
        displayAnimation('* *');
        // Show message after animation of last pressed button and counter
        setTimeout(function () {
          $('.msg-wrapper').addClass('show');
          // hide message and restart the game
          setTimeout(function (e) {
            $('.msg-wrapper').removeClass('show');
            resetGame();
            initializingGame();
            gameStepping();
          }, 2500)
        }, 1500)
        console.log('=========== Only 20 Steps are allowed in the game ================ ')
      }

      logs();
    }

    // Show the steps of current steps array one by one
    function showSteps() {

      let intervalDelayToCut = count * 35; // For Increasing Speed with each count passed
      let pauseDelayToCut = count * 8; // For Increasing Speed with each count passed

      // For Totals
      let intervalTime;
      let pauseTime;

      if (count === 1) { // additional delay for first step so that animation on counter will be displayed easily
        pauseTime = 1000;
        intervalTime = 1800 - intervalDelayToCut;
      } else {
        pauseTime = 400 - pauseDelayToCut;
        intervalTime = 1200 - intervalDelayToCut;
      }

      // copy currentStep and work with copy because we may need currentStep to display again on error
      let copyCurrentStep = currentStep.slice();

      // Showing steps one by one
      stepInterval = setInterval(function (e) {
        $('.simon-button.light').removeClass('light'); // caution - remove if any was pressed before
        let countDisplay = (count < 10) ? '0' + count : count; // 2 digit in output at least

        setTimeout(function (e) { // pause between showing steps
          if (copyCurrentStep.length === 0) { // if steps display ends
            isWaiting = true; // await for user now
            clearInterval(stepInterval); // clear the intervals for showing steps
            console.log('============== Stopped Displaying Steps Now Waiting for User Input ==============');
          } else {
            $('#count').html(countDisplay); // update the counter

            // show the step and play the sound relative to that step
            stepPart = copyCurrentStep.shift();
            document.getElementById('audio' + stepPart).cloneNode(true).play();
            $('.simon-button[data-button-number="' + stepPart + '"]').addClass('light');

            logs(); // only show logs when steps are calculated
          }
        }, pauseTime);
      }, intervalTime);
    }

    clearInterval(stepInterval); // for preventing the setting of multiple intervals (fix the looping issue because of two intervals)
    userInput = []; // resetting previously entered user input if any(deal with this on user response)

    if (!isAgain) { // if no error then start setting and showing steps
      setNewSteps();
      showSteps();
    } else { // show error on counter and repeat the steps (i.e. currentSteps array)
      displayAnimation('! !');
      setTimeout(function (e) {
        showSteps();
      }, 1500);
    }
  }

  // Resetting the Game
  // - isStepsRenew -> true if we need new steps (false means keep same steps if start button is pressed and the game is already started before once)
  function resetGame(isStepsRenew = true) {

    //clearing intervals (specially for when game is stopped in between our intervals looping)
    clearInterval(stepInterval);
    clearInterval(displayInterval);

    count = 0;
    currentStep = null;
    steps = (!isStepsRenew) ? steps : null;
    stepPart = null;
    isWaiting = false;
    isComplete = false;

    // Instant Default Layout
    $('.simon-button.light').removeClass('light');
    $('#count').html('- -');
    // Clear after displaying anything in queue
    setTimeout( function (e) { // fixing the stucking layout issue because interval is called after sometime so clearing them will have not effect on which is already in queue
      // resetting the layout to default
      $('.simon-button.light').removeClass('light');
      $('#count').html('- -');
    }, 1000);

    console.clear();
  }

  // change layout based on switch turned on or off
  function changeLayoutOnStatus() {
    if (gameStatus === 'off') { // turn on the game
      gameStatus = 'on';
      $('#switch').attr('data-game-status', 'on');
      $('#switch').addClass('on');

      $('.simon-display').addClass('on');

    } else if (gameStatus === 'on') { // turn off the game
      gameStatus = 'off';
      $('#switch').attr('data-game-status', 'off');
      $('#switch').removeClass('on');

      $('.simon-display').removeClass('on');
    }
  }

  // when game is turned off
  function turnOff() {
    // reset strict mode
    isStrictMode = false;
    $('.strict-indicator').removeClass('on');

    // reset everything else
    resetGame();
  }

  // for necessary logs
  function logs() {
    console.group('Game Step')
    console.log(`Steps: ${steps}`);
    console.log(`Current Step: ${currentStep}`);
    console.log(`Step Part: ${stepPart}`);
    console.log(`User Input: ${userInput}`);

    console.groupEnd();
  }

  // Functionality when game is turned on or off (UI changes)
  $('#switch').on('click', function (e) {
    gameStatus = $(this).attr('data-game-status');
    changeLayoutOnStatus(); //change status and layout

    if (gameStatus === 'off') { // turn off the game
      turnOff();
    }
    logs();
  });

  // when start button is pressed
  $('#start-game').click(function (e) {
    if (gameStatus === 'on') { // only work if game is on
      if (!steps) { // if steps are not already initialized
        resetGame();
        initializingGame();
      } else { // else continue with the initalized step but from initial step
        resetGame(false); // false indicate not to renew the steps
      }
      gameStepping(); // Start Game Stepping i.e setting steps and showing steps one by one till count 20 (main function)
    } else {
      console.log('Game is Turned OFF.');
    }
  });

  // when mouse button is down on the board
  $('.simon-button').on('mousedown', function (e) {

    if (gameStatus === 'on' && isWaiting && !isComplete) { // if game is on, not completed and need user response

      // Show currently pressed button and play the sound relative to that
      let value = $(this).attr('data-button-number');
      document.getElementById('audio' + value).cloneNode(true).play();
      $(this).addClass('light');

    } else {
      // Show messages based on game condition
      if (isComplete) {
        console.log('Game is Completed');
      } else if (gameStatus === 'on') {
        console.log('------ Waiting for user turn ------------');
      }
    }

  });

  // when mouse button is up on the board
  $('.simon-button').on('mouseup', function (e) {

    // validating user input
    function isCorrectInput(input) {
      userInput.push(input);
      for (var i = 0; i < userInput.length; i++) {
        if (parseInt(userInput[i]) !== currentStep[i]) {
          return false;
        }
      }
      return true;
    }

    if (gameStatus === 'on' && isWaiting && !isComplete) { // if game is on, not completed and need user response
      $(this).removeClass('light'); // remove pressed button

      // verify current input
      let value = $(this).attr('data-button-number');
      let isValid = isCorrectInput(value);

      if (isValid) { // continue till reach end of the inputs needed
        // continue setting and showing next step
        if (userInput.length === currentStep.length) {
          isWaiting = false;
          gameStepping();
        }

        logs(); // for showing logs after each input
      } else { // Show error and restart the game if strictMode is active
        isWaiting = false;

        if (!isStrictMode) {
          gameStepping(true); // show the currentStep again to the user
        } else {
          displayAnimation('! !'); // show error on counter display
          setTimeout(function (e) { // reset the game after displaying animation
            resetGame();
            initializingGame();
            gameStepping();
          }, 2500);
        }
      }
    }
  });

  // setting the strict mode and its UI
  $('#strict-mode').on('click', function (e) {
    if (gameStatus === 'on') { // set only when game is on
      $(this).children('.strict-indicator').toggleClass('on');
      isStrictMode = (isStrictMode === false) ? true : false;
    } else {
      console.log('Game is Turned OFF.');
    }
  });
});
