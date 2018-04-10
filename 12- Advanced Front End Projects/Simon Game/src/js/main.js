"use strict";

$(document).ready(function (e) {

  let gameStatus = 'off'; // tunr the game on or off
  let count = 0; // count of steps to repeat
  let steps = null; // to track all of the steps
  let currentStep = null; // array of current steps to display or evaluate
  let stepPart = null; // get just one part of the current step to show the steps
  let stepInterval = null; // for showing steps to the user
  let displayInterval = null; // display on and off animation on start
  let pauseTime = 0; // time in ms to pause between displaying steps
  let isWaiting = true // if game is waiting for user feedback after showing the steps (keep user away to interfere in between)
  let userInput = [] // for storing user inputs
  let isStrictMode = false; // for strict mode
  let isComplete = false; // for completion

  function displayAnimation(value = '- -') {
    $('#count').html(value);

    let hideAndSeek = 0;
    displayInterval = setInterval(function (e) {
      $('.simon-display').toggleClass('on');

      if (isComplete) {
        $('.simon-button[data-button-number="' + stepPart + '"]').toggleClass('light');
      }
      hideAndSeek++;
      if (hideAndSeek >= 4) {
        $('.simon-display').addClass('on');
        if (isComplete) {
          $('.simon-button.light').removeClass('light');
        }
        clearInterval(displayInterval);
      }
    }, 300);
  }

  function initializingGame(isStepsRenew = true) {
    if(isStepsRenew) {
      steps = [];
      for (let i = 0; i < 20; i++) {
        let step = Math.floor((Math.random() * 4) + 1);
        steps.push(step);
      }
    }

    // For help in testing
    // steps = [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4];

    displayAnimation();
    // logs();
  }

  function gameStepping(isAgain = false) {
    function setNewSteps() {
      currentStep = [];
      if (count < 20) {
        for (var i = 0; i < count + 1; i++) {
          currentStep.push(steps[i]);
        }
        count++;
      } else {
        isComplete = true;
        displayAnimation('* *');
        setTimeout(function () {
          $('.msg-wrapper').addClass('show');
          setTimeout(function (e) {
            $('.msg-wrapper').removeClass('show');
            resetGame();
            initializingGame();
            gameStepping();
          },2500)
        },1500)
        console.log('=========== Only 20 Steps are allowed in the game ================ ')
      }

      logs();
      return currentStep;
    }

    function showSteps() {

      let intervalDelayToCut = count * 35; // For Increasing Speed
      let pauseDelayToCut = count * 8; // For Increasing Speed

      let intervalTime;

      if (count === 1) { // additional delay for first step so that animation on counter will be displayed easily
        pauseTime = 1000;
        intervalTime = 1800 - intervalDelayToCut;
      } else {
        pauseTime = 400 - pauseDelayToCut;
        intervalTime = 1200 - intervalDelayToCut;
      }

      let copyCurrentStep = currentStep.slice();
      stepInterval = setInterval(function (e) {
        // debugger;
        // console.log(intervalTime);
        $('.simon-button.light').removeClass('light');

        let countDisplay = (count < 10) ? '0' + count : count;

        setTimeout(function (e) {

          if (copyCurrentStep.length === 0) {
            isWaiting = true;
            console.log('============== Stop Displaying Steps Waiting for User Input Now ==============');
            clearInterval(stepInterval);
          } else {
            $('#count').html(countDisplay);

            stepPart = copyCurrentStep.shift();
            // debugger;
            $('.simon-button[data-button-number="' + stepPart + '"]').addClass('light');
            document.getElementById('audio'+stepPart).cloneNode(true).play();

            logs(); // only show logs when steps are calculated
          }

        }, pauseTime);

      }, intervalTime);
    }

    clearInterval(stepInterval);

    userInput = []; // resetting user input to check gain from start for nextStep
    if (!isAgain) {
      setNewSteps();
      showSteps();
    } else {
      displayAnimation('! !'); // Showing wrong inputs
      setTimeout(function (e) {
        showSteps();
      }, 1500);
    }
  }

  function turnOff() {
    resetGame();

    isStrictMode = false;
    $('.strict-indicator').removeClass('on');
  }

  function resetGame(isStepsRenew = true) {

    if (stepInterval) {
      clearInterval(stepInterval);
    }
    if (displayInterval) {
      clearInterval(displayInterval);
    }

    count = 0;
    currentStep = null;
    if(isStepsRenew) {
      steps = null;
    }
    stepPart = null;
    isWaiting = false;
    isComplete = false;

    $('.simon-button.light').removeClass('light');

    $('#count').html('- -');

    console.clear();
    // logs();
  }

  function logs() {
    console.group('Game Step')
    console.log(`Steps: ${steps}`);
    console.log(`Current Step: ${currentStep}`);
    console.log(`Step Part: ${stepPart}`);
    console.log(`User Input: ${userInput}`);

    console.groupEnd();
  }

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

  $('#switch').on('click', function (e) {
    gameStatus = $(this).attr('data-game-status');

    changeLayoutOnStatus(); //change status and layout
    if (gameStatus === 'off') { // turn off the game
      turnOff();
    }
    logs();
  });

  $('#start-game').click(function (e) {
    if (gameStatus === 'on') {
      if(!steps) {
        resetGame();
        initializingGame();
      }else{
        resetGame(false);
        initializingGame(false);
      }
      gameStepping();
    } else {
      console.log('Game is Turned OFF.');
    }
  });

  $('.simon-button').on('mousedown', function (e) {

    if (gameStatus === 'on' && isWaiting && !isComplete) {
      $(this).addClass('light');

      let value = $(this).attr('data-button-number');
      document.getElementById('audio'+value).cloneNode(true).play();

    } else {

      if (isComplete) {
        console.log('Game is Completed');
      } else if (gameStatus === 'on') {
        console.log('------ Waiting for user turn ------------');
      }
    }

  });

  $('.simon-button').on('mouseup', function (e) {

    function isCorrectInput(input) {
      userInput.push(input);
      for (var i = 0; i < userInput.length; i++) {
        if (parseInt(userInput[i]) !== currentStep[i]) {
          return false;
        }
      }
      return true;
    }

    if (gameStatus === 'on' && isWaiting) {
      $(this).removeClass('light');

      let value = $(this).attr('data-button-number');
      let isValid = isCorrectInput(value);

      if (isValid) {
        logs(); // for showing logs after each input
        if (userInput.length === currentStep.length) {
          isWaiting = false;
          gameStepping(false);
        }
      } else {
        isWaiting = false;

        if (!isStrictMode) {
          gameStepping(true);
        } else {
          displayAnimation('! !');

          setTimeout(function (e) {
            resetGame();

            initializingGame();
            gameStepping();
          }, 1500);
        }
      }
    }
  });

  $('#strict-mode').on('click', function (e) {
    if (gameStatus === 'on') {
      $(this).children('.strict-indicator').toggleClass('on');
      isStrictMode = (isStrictMode === false) ? true : false;
    } else {
      console.log('Game is Turned OFF.');
    }
  });
});
