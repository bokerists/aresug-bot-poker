
const detector = require('botpoker-card-detection');

exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  cardValue: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],

  bet: function(gamestate) {

    //
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki#gamestate for further info about the data structure.

    //
    // you just have to return the amount that you want to bet.



    // enjoy the game!

    //
    // currently we just fold every single hand.

    'use strict';

    console.log(`Currently playing tournament ${gamestate.tournamentId}`);

    const me = this.myPlayer(gamestate);

    const cards = me.cards;
    console.dir(cards);

    if (cards.every(x => this.cardValue.indexOf(x.rank) > 8)) {
      return this.allIn(gamestate);
    }



    return 0;

  },

  myPlayer: function(gamestate) {
    return gamestate.players[gamestate.me];
  },

  allIn: function(gamestate) {
    console.log('All in!');
    return this.myPlayer(gamestate).chips;
  }

};
