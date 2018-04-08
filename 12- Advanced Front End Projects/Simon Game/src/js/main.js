"use strict";

class Player {

  constructor(name, isComputer, symbol) {
    this.name = name; // useful for printing msgs
    this.isComputer = isComputer;
    this.symbol = symbol;
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
      if(this.player2.isComputer){
        this.turn = '1p'; // If there is computer turn first then the game flow will remain same means computer play same moves over and over
      }else {
        let turn = Math.floor(Math.random() * 2);

        if (turn === 0) {
          this.turn = '1p';
        } else if (turn === 1) {
          this.turn = '2p';
        }
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
  check_game_status(board, symbol = null) {
    if (!symbol)
      symbol = this.get_current_player_sybmol();

    if (
        (board[0] === symbol && board[1] === symbol && board[2] === symbol) || // rows
        (board[3] === symbol && board[4] === symbol && board[5] === symbol) || // rows
        (board[6] === symbol && board[7] === symbol && board[8] === symbol) || // rows
        (board[0] === symbol && board[3] === symbol && board[6] === symbol) || // cols
        (board[1] === symbol && board[4] === symbol && board[7] === symbol) || // cols
        (board[2] === symbol && board[5] === symbol && board[8] === symbol) || // cols
        (board[0] === symbol && board[4] === symbol && board[8] === symbol) || // diagnols
        (board[2] === symbol && board[4] === symbol && board[6] === symbol) // diagnols
    ) {
      return symbol;
    }

    return false;
  }

  // get empty boxes (also useful for checking tie condition i.e if nothing available and no one wins)
  get_available_spaces(board) {
    let availableSpaces = []
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
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

  // get the move via algorithm
  ai_move() {
    // debugger;
    let move = this.minimax(this.board, this.player2.symbol, 0);
    return move.index;
  }

  // the main minimax function (algorithm for AI Move)
  // reference : https://github.com/ahmadabdolsaheb/minimaxarticle/blob/master/index.js
  // article : https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
  minimax(newBoard, player, depth) {

    //available spots
    var availSpots = this.get_available_spaces(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (this.check_game_status(newBoard, this.player1.symbol)) {
      return {score: depth - 10};
    }
    else if (this.check_game_status(newBoard, this.player2.symbol)) {
      return {score: 10 - depth};
    }
    else if (availSpots.length === 0) {
      return {score: 0};
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = availSpots[i];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == this.player2.symbol) {
        var result = this.minimax(newBoard, this.player1.symbol, depth + 1);
        move.score = result.score;
      }
      else {
        var result = this.minimax(newBoard, this.player2.symbol, depth + 1);
        move.score = result.score;
      }

      //reset the spot to empty (as the array passed by reference)
      newBoard[availSpots[i]] = "";

      // push the object to the array
      moves.push(move);
    }


    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === this.player2.symbol) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {

      // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
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

  let game;

  // Setting Layout for Turns
  function setTurn(turn) {
    $('.turn.active').removeClass('active');
    $('#turn-' + turn).addClass('active');
  }

  // making the computer move and updating the layout
  function computerMove() {
    if (game.player2.isComputer && game.turn === '2p') {
      setTimeout(function (e) { // add delay while making moves

        let location = game.ai_move();
        let isValid = game.play_move(location);

        if (isValid) { // update layout if move is valid
          $('.single-box[data-location=' + location + ']').children('.symbol-placeholder').html(game.player2.symbol);
          checkGameStatus(); // check game status ( win, lose, tie or next turn)
        }

        game.logs();
      }, 1000);
    }
  }

  // Check and show if player win, loses or draws
  function checkGameStatus() {
    // debugger;
    let isWon = game.check_game_status(game.board);
    let isTie = (game.get_available_spaces(game.board).length === 0) ? true : false;

    // Showing msgs based on the conditions of the win, lose or draw and update total wins of the board
    if (isWon) {
      if (game.mode === '2p') {
        if (game.player1.symbol === isWon) {
          game.wins['player1']++;
          showResult(game.player1.name + ' is Won!');
        } else if (game.player2.symbol === isWon) {
          showResult(game.player2.name + ' is Won!');
          game.wins['player2']++;
        }
      } else if (game.mode === '1p') {
        if (game.player1.symbol === isWon) {
          game.wins['player1']++;
          showResult('Congrats! You Won :D');
        }
        if (game.player2.symbol === isWon) {
          showResult('Oh oh You Lost :(');
          game.wins['player2']++;
        }
      }
    } else if (isTie) {
      showResult('Game is Drawn');
      game.wins['draws']++;
    }

    // Update the UI of scores if there is any win or draw
    if (isWon || isTie) {
      $('#player1-score > .score').html(game.wins['player1']);
      $('#draw-score > .score').html(game.wins['draws']);
      $('#player2-score > .score').html(game.wins['player2']);

      console.log("==================== Game Ends ====================");
    } else { // if no win or draw then shift the turn
      setTurn(game.set_turn());
    }
  }

  // showing the result and continue playing after it
  function showResult(msg) {
    // resetting the board (for next game i.e after result)
    function resetBoard() {
      game.board = new Array(9).fill('');
      game.turn = null;

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
      setTurn(game.set_turn());
      // Play the move if the second player is computer and it was computers turn
      computerMove();

      game.logs();
    }, 2500);
  }

  // Setting the Game Mode (Will be passed after selecting symbol)
  $('.mode-btn').on('click', function (e) {
    $(this).addClass('active');
    $('.game-mode').hide();
    $('.game-symbol').show();

    // Update controls and turn UI based on mode selection
    if ($(this).attr('data-mode') === '1p') {
      $('.game-symbol .mode-question').html('Would you like to be X or O?');
      $('#turn-2p').html('Computer Turns');
      $('#player2-score > .player').html('computer');
    } else if ($(this).attr('data-mode') === '2p') {
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
    game= new Board(mode, symbol);

    // Show board and start the game
    $('.game-symbol').hide();
    $('.game-board').show();
    setTurn(game.set_turn());

    // Play the move if the second player is computer and it was computers turn
    computerMove();

    game.logs();
  });

  // Playing the Moves (Both Player and Computer if Exists)
  $('.single-box').on('click', function (e) {
    let location = $(this).attr('data-location');

    // If the second player is not computer then update the UI
    if (!(game.turn === '2p' && game.player2.isComputer)) { // preventing user interference when its computer turns
      let isValid = game.play_move(location);

      if (isValid) {
        $(this).children('.symbol-placeholder').html(game.get_current_player_sybmol());
        checkGameStatus();

        // Play the move if the second player is computer and it was computers turn
        computerMove();
      }
      game.logs();
    } else {
      console.log(' =================== Its Computer Turns =================');
    }

  })

  // Resetting the Game
  $('#reset').on('click', function (e) {
    console.clear();
    game= null; // reset the board

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
