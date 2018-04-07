"use strict";

class Player {

  constructor(name, isComputer, symbol) {
    this.name = name; // useful for printing msgs
    this.isComputer = isComputer;
    this.symbol = symbol;
  }

  getBestMove(availableSpaces) {
    // Get random index from available spaces
    if (this.isComputer) {
      let index = Math.floor(Math.random() * availableSpaces.length);
      return availableSpaces[index];
    }
  }

  // Getting Logs
  // player => 1p/2p
  logs(player) {
    console.group('Player');
    console.log(`Player: ${player}`);
    console.log(`Name: ${this.name}`);
    console.log(`isComputer: ${this.isComputer}`);
    console.log(`Symbol: ${this.symbol}`);
    console.groupEnd();
  }
}

class Board {

  constructor(gameMode, playerSymbol) {
    // Initializing Board
    this.board = new Array(9).fill('');
    this.mode = gameMode;

    // Initializing Players with proper symbols
    this.player1 = new Player('Player1', false, playerSymbol.trim());
    if (this.mode) {
      let player2Symbol = (playerSymbol.trim() === 'X') ? 'O' : 'X';
      if (this.mode === '2p') {
        this.player2 = new Player('Player2', false, player2Symbol);
      } else {
        this.player2 = new Player("Computer's", true, player2Symbol);
      }
    }

    // Variable for handling turns
    this.turn = null;

    // Total Wins
    this.wins = {
      'player1': 0,
      'player2': 0,
      'draws': 0
    }


  }

  // Setting the player turn
  set_turn() {
    if (this.turn === null) { // Random When Game is Started
      let turn = Math.floor(Math.random() * 2);

      if (turn === 0) {
        this.turn = '1p';
      } else if (turn === 1) {
        this.turn = '2p';
      }
    } else { // Switch the turn based on previous turn
      if (this.turn === '1p') {
        this.turn = '2p';
      }
      else if (this.turn === '2p') {
        this.turn = '1p';
      }
    }
    return this.turn;
  }

  // get symbol of player having current turn
  get_current_player_sybmol() {
    if (this.turn === '1p') {
      return this.player1.symbol;
    } else if (this.turn === '2p') {
      return this.player2.symbol;
    }
  }

  // check if anyone wins or not
  check_game_status() {
    let symbol = this.get_current_player_sybmol();

    if (
        (this.board[0] === symbol && this.board[1] === symbol && this.board[2] === symbol) || // rows
        (this.board[3] === symbol && this.board[4] === symbol && this.board[5] === symbol) || // rows
        (this.board[6] === symbol && this.board[7] === symbol && this.board[8] === symbol) || // rows
        (this.board[0] === symbol && this.board[3] === symbol && this.board[6] === symbol) || // cols
        (this.board[1] === symbol && this.board[4] === symbol && this.board[7] === symbol) || // cols
        (this.board[2] === symbol && this.board[5] === symbol && this.board[8] === symbol) || // cols
        (this.board[0] === symbol && this.board[4] === symbol && this.board[8] === symbol) || // diagnols
        (this.board[2] === symbol && this.board[4] === symbol && this.board[6] === symbol) // diagnols
    ) {
      return true;
    }

    return false;
  }

  // get empty boxes (also useful for checking tie condition i.e if nothing available and no one wins)
  get_available_spaces() {
    let availableSpaces = []
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === '') {
        availableSpaces.push(i);
      }
    }
    return availableSpaces;
  }

  // play move depending on the player turn (return true if move is valid else false
  play_move(location) {
    if (this.board[location] === '') {
      if (this.turn === '1p') {
        this.board[location] = this.player1.symbol;
      } else if (this.turn === '2p') {
        this.board[location] = this.player2.symbol;
      }
      return true;
    } else {
      return false; // if location is not empty then return false (force the user to select again)
    }
  }

  // logs
  logs() {
    console.group('Board');

    console.log('Game Board');
    console.log(this.board);
    console.log(`Game Mode: ${this.mode}`);

    this.player1.logs('p1');
    this.player2.logs('p2');

    console.log('Player Turn: ' + this.turn);
    console.log('Total Wins: ')
    console.log(this.wins);

    console.groupEnd();
  }

}

$(document).ready(function (e) {

  let board;

  // Setting Layout for Turns
  function setTurn(turn) {
    $('.turn.active').removeClass('active');
    $('#turn-' + turn).addClass('active');
  }

  // making the computer move and updating the layout
  function computerMove() {
    if (board.player2.isComputer && board.turn === '2p') {
      setTimeout(function (e) { // add delay while making moves

        let availableSpaces = board.get_available_spaces();
        let location = board.player2.getBestMove(availableSpaces);
        let isValid = board.play_move(location);

        if (isValid) { // update layout if move is valid
          $('.single-box[data-location=' + location + ']').children('.symbol-placeholder').html(board.player2.symbol);
          checkGameStatus(); // check game status ( win, lose, tie or next turn)
        }

        board.logs();
      }, 1000);
    }
  }

  // Check and show if player win
  function checkGameStatus() {
    let isWon = board.check_game_status();
    let isTie = (board.get_available_spaces().length === 0) ? true : false;

    // Showing msgs based on the conditions of the win, lose or draw and update total wins of the board
    if (isWon) {
      if (board.mode === '2p') {
        if (board.player1.symbol === board.get_current_player_sybmol()) {
          board.wins['player1']++;
          showResult(board.player1.name + ' is Won!');
        } else if (board.player2.symbol === board.get_current_player_sybmol()) {
          showResult(board.player2.name + ' is Won!');
          board.wins['player2']++;
        }
      } else if (board.mode === '1p') {
        if (board.player1.symbol === board.get_current_player_sybmol()) {
          board.wins['player1']++;
          showResult('Congrats! You Won :D');
        }
        if (board.player2.symbol === board.get_current_player_sybmol()) {
          showResult('Oh oh You Lost :(');
          board.wins['player2']++;
        }
      }
    } else if (isTie) {
      showResult('Game is Drawn');
      board.wins['draws']++;
    }

    // Update the UI of scores if there is any win or draw
    if (isWon || isTie) {
      $('#player1-score > .score').html(board.wins['player1']);
      $('#draw-score > .score').html(board.wins['draws']);
      $('#player2-score > .score').html(board.wins['player2']);

      console.log("==================== Game Ends ====================");
    }else{ // if no win or draw then shift the turn
      setTurn(board.set_turn());
    }
  }

  // showing the result and continue playing after it
  function showResult(msg) {
    // resetting the board (for next game i.e after result)
    function resetBoard() {
      board.board = new Array(9).fill('');
      board.turn = null;

      $('.symbol-placeholder').html('');
      $('.turn.active').removeClass('active');
    }

    resetBoard();
    // Show game msg
    $('#result').html(msg);
    $('.game-result').fadeIn();

    setTimeout(function (e) { // hide result and start next game after some delay
      $('.game-result').hide();
      $('#result').html('');

      // Restarting the game
      setTurn(board.set_turn());
      // Play the move if the second player is computer and it was computers turn
      computerMove();

      board.logs();
    }, 2500);
  }

  // Setting the Game Mode (Will be passed after selecting symbol)
  $('.mode-btn').on('click', function (e) {
    $(this).addClass('active');
    $('.game-mode').hide();
    $('.game-symbol').show();

    // Update controls and turn UI based on mode selection
    if($(this).attr('data-mode') === '1p'){
      $('.game-symbol .mode-question').html('Would you like to be X or O?');
      $('#turn-2p').html('Computer Turns');
      $('#player2-score > .player').html('computer');
    }else if($(this).attr('data-mode') === '2p'){
      $('.game-symbol .mode-question').html('Player1 : Would you like to be X or O?');
      $('#turn-2p').html('Player2 Turns');
      $('#player2-score > .player').html('player2');
    }

    // show controls after updating the UI
    $('.game-controls').show();
  });

  // Setting the Symbol for Player1 (Starts the Game)
  $('.symbol-choice').on('click', function (e) {
    let symbol = $(this).html();
    let mode = $('.mode-btn.active').removeClass('active').attr('data-mode');

    // Initialize the board with the game mode and setting symbols
    board = new Board(mode, symbol);

    // Show board and start the game
    $('.game-symbol').hide();
    $('.game-board').show();
    setTurn(board.set_turn());

    // Play the move if the second player is computer and it was computers turn
    computerMove();

    board.logs();
  });

  // Playing the Moves (Both Player and Computer if Exists)
  $('.single-box').on('click', function (e) {
    let location = $(this).attr('data-location');

    // If the second player is not computer then update the UI
    if (!(board.turn === '2p' && board.player2.isComputer)) { // preventing user interference when its computer turns
      let isValid = board.play_move(location);

      if (isValid) {
        $(this).children('.symbol-placeholder').html(board.get_current_player_sybmol());
        checkGameStatus();

        // Play the move if the second player is computer and it was computers turn
        computerMove();
      }
      board.logs();
    } else {
      console.log(' =================== Its Computer Turns =================');
    }

  })

  // Resetting the Game
  $('#reset').on('click', function (e) {
    console.clear();
    board = null; // reset the board

    // reset turn ui, scores and board
    $('.turn.active').removeClass('active');
    $('.game-scores .score').html('0');
    $('.symbol-placeholder').html('');

    // starts from beginning (mode selection)
    $('.game-mode').show();
    $('.game-symbol').hide();
    $('.game-board').hide();
    $('.game-controls').hide();
    $('.game-result').hide();

  });
});
