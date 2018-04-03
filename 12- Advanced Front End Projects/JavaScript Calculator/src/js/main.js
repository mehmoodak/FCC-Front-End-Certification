"use strict";

$(document).ready(function (e) {

  //variables to store values;
  let operation;
  let operand1, operand2;
  let answer;

  // for showing logs
  function logs(output = null) {
    console.log('Answer: ' + answer, ', Operation: ' + operation, ', Output: ' + output, ', Operand1: ' + operand1, ', Operand2: ' + operand2);
  }

  // for showing equation below the input screen
  function showEquation() {
    let equation = $('#equation');

    if (operand1 || operation || operand2 || answer) {

      $('#equation').html('');

      if (operand1) {
        equation.html(operand1);
      }

      switch (operation) {
        case '+':
          equation.html($('#equation').html() + ' + ');
          break;
        case '-':
          equation.html($('#equation').html() + ' - ');
          break;
        case '*':
          equation.html($('#equation').html() + ' x ');
          break;
        case '/':
          equation.html($('#equation').html() + ' ÷ ');
          break;
      }

      if (operand2) {
        equation.html($('#equation').html() + operand2);
      }

      if (answer) {
        equation.html($('#equation').html() + answer);
      }
    }else{ // if everything is null
      $('#equation').html('0');
    }
  }

  // for fixing problems with floating points in javascript (use library of decimal.js)
  function getMultiplication(operand1, operand2) {
      let op1 = new Decimal(operand1);
      let op2 = new Decimal(operand2);

      let answer = op1.times(op2);

      return answer.toString();
  }

  // handles both simple and chained calcuations
  function calculate(isEqual) {

    // perform calculations if there are both operands or answer
    if ( (operand1 && operand2) || answer) {

      // perform operation if present (operands are mainly handled by numeric inputs)
      switch (operation) {
        case '+':
          answer = parseFloat(operand1) + parseFloat(operand2);
          break;
        case '-':
          answer = parseFloat(operand1) - parseFloat(operand2);
          break;
        case '*':
          answer = getMultiplication(operand1, operand2);
          break;
        case '/':
          answer = parseFloat(operand1) / parseFloat(operand2);
          break;
      }

      if (isEqual) { // reset if equal is pressed
        operand1 = null;
        operation = null;
      } else { // if we already have an answer and going with that then put answer to operand1
        operand1 = answer;
        answer = null;
      }
      operand2 = null;
    }
  }

  // if number or decimal is pressed
  $('button.numeric').on('click', function (e) {
    let digit = $(this).html(); // get button value that currently pressed
    let output = $('#output').html(); // previous output


    if ((output !== '0' && !answer) || digit === '.') {

      // Handling the decimal if present else print the digit
      if (digit === '.') {
        for (let i = 0; i < output.length; i++) {
          // skip if present else print
          if (output[i] === '.') {
            break;
          } else if (i === output.length - 1) {
            $('#output').html(output + digit);
          }
        }
      } else {
        $('#output').html(output + digit);
      }

    } else {
      $('#output').html(digit);
    }

    answer = null; // only deal with answer if calculating via arithematic or equal else start new calculation
    // if operation present then operand2 else operand1
    (!operation) ? operand1 = $('#output').html() : operand2 = $('#output').html();


    showEquation(); // show updated values on equation place
    logs($('#output').html());
  });

  // if arithematic is pressed
  $('button.arithematic').on('click', function (e) {
    // if there is at least operand1 or answer then perform calculations ( answer check for keep chaining)
    if (operand1 || answer) {

      calculate();
      //Getting operation value (calculate first if anything is in queue)
      operation = $(this).attr('data-value');

      showEquation();
      $('#output').html('0');

      logs($('#output').html());
    }
  });

  // if equal is pressed
  $('button.equal').on('click', function (e) {

    calculate(true); // pass isEqual true for resetting operand1 else operand1 = answer via arithematic call

    showEquation();
    $('#output').html('0');

    logs($('#output').html());
  });

  // if backspace is pressed
  $('button.backspace').on('click', function (e) {

    let output = $('#output').html();
    if (output !== '0') { // only work if there is some value
      let backspace_value = output.slice(0, output.length - 1); //slice the last input

      if (!operand2) { // if operand 2 is not present then it means deal with operand1
        operand1 = backspace_value;
        if(operand1) { // print value if there is else print 0 which identifies null
          $('#output').html(operand1);
        }else{
          operand1 = null; // null not empty string
          $('#output').html('0');
        }
      }else{ // else deal with operand2
        operand2 = backspace_value;
        if(operand2) { // print value if there is else print 0 which identifies null
          $('#output').html(operand2);
        }else{
          operand2 = null; // null not empty string
          $('#output').html('0');
        }
      }

      showEquation();
    }

    logs($('#output').html());
  });

  //reset everything
  $('button.clear').on('click', function (e) {
    operation = null;
    answer = null;
    operand1 = null;
    operand2 = null;

    $('#output').html('0');
    $('#equation').html('0');

    logs();
  });

});
