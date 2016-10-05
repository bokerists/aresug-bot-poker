'use strict';

const detector = require('botpoker-card-detection');

exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  cardValue: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],

  bet: function(gamestate) {
    const preFlop = gamestate.commonCards.length == 0;

    const allCards = gamestate.commonCards.concat(this.myPlayer(gamestate).cards);

    //
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki#gamestate for further info about the data structure.

    //
    // you just have to return the amount that you want to bet.



    // enjoy the game!

    //
    // currently we just fold every single hand.


    console.log(`Currently playing tournament ${gamestate.tournamentId}`);

    const me = this.myPlayer(gamestate);

    const cards = me.cards;
    console.dir(cards);

    if (cards.every(x => this.cardValue.indexOf(x.rank) > 7)) {
      if (cards[0].rank === cards[1].rank) {
        return this.allIn(gamestate);
      }
      return this.raise(gamestate);
    }

    if (detector.hasTris(allCards)) {
      return this.raise(gamestate);
    }

    if (preFlop) {
      return this.call(gamestate);
    }

    if (detector.hasTris(allCards)) {
      return this.raise(gamestate);
    }

    return 0;
  },

  myPlayer: function(gamestate) {
    return gamestate.players[gamestate.me];
  },

  fold: function() {
    console.log('fold');
    return 0;
  },

  raise: function(gamestate) {
    console.log('raise');
    return Math.max(gamestate.callAmount * 2, gamestate.minimumRaiseAmount);
  },

  allIn: function(gamestate) {
    console.log('all in');
    return this.myPlayer(gamestate).chips;
  },

  call: function(gamestate) {
    console.log('call');
    return gamestate.callAmount;
  }
};
