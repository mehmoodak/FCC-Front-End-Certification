"use strict";

class Player{

  constructor(isComputer, symbol){
    this.isComputer = isComputer;
    this.symbol = symbol;
  }

  getBestMove(availableSpaces){
    if(this.isComputer){
      return Math.floor(Math.random() * availableSpaces.length);
    }else{
      return null;
    }
  }

  // Getting Logs
  // player => 1p/2p
  logs(player){
    console.group('Player');
    console.log(`Player: ${player}`);
    console.log(`isComputer: ${this.isComputer}`);
    console.log(`Symbol: ${this.symbol}`);
    console.groupEnd();
  }
}

class Board{

  constructor(gameMode, playerSymbol){
    // Initializing Board
    this.board = new Array(9).fill('');
    this.mode = gameMode;

    // Initializing Players with proper symbols
    this.player1 = new Player(false, playerSymbol);
    if(this.mode) {
      let player2Symbol = (playerSymbol === 'X') ? 'O' : 'X';
      if (this.mode === '2p') {
        this.player2 = new Player(false, player2Symbol);
      }else{
        this.player2 = new Player(true, player2Symbol);
      }
    }

    // Variable for handling turns
    this.turn = null;

    // Total Wins
    this.wins = {
      'player1' : 0,
      'player2' : 0,
      'draws' : 0
    }


  }

  get_turn(){
    if( this.turn === null) {
      let turn = Math.floor(Math.random() * 2);

      if (turn === 0) {
        return '1p';
      } else if (turn === 0) {
        return '2p';
      }
    }else{
      if(this.turn === '1p')
        return '2p';
      else if (this.turn === '2p'){
        return '1p';
      }
    }


  }

  // check if anyone wins or not
  check_game_status(){
    console.log('Checking Game Status');
  }

  // getAvailableSpaces
  check_game_status(){
    console.log('Getting Available Spaces');
  }

  // play move depending on the player turn
  play_move(location, turn){
    console.log('Playing Move');
  }

  // logs
  logs(){
    console.group('Board');
    console.log('Game Board');
    console.log(this.board);
    console.log(`Game Mode: ${this.mode}`);

    this.player1.logs('p1');
    this.player2.logs('p2');

    console.log('Player Turn: ' + this.turn);
    console.log('Total Wins: ')
    console.log(this.wins);
  }

}

$(document).ready(function (e) {
  let board = new Board('1p', 'X');

  board.logs();
});
