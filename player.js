'use strict';

const detector = require('botpoker-card-detection');

exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  cardValue: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],

  bet: function(gamestate) {
    const preFlop = gamestate.commonCards.length == 0;
    const call = gamestate.callAmount;
    const raise = Math.max(gamestate.callAmount * 2, gamestate.minimumRaiseAmount);
    const allIn = this.myPlayer(gamestate).chips;

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

    if (cards.every(x => this.cardValue.indexOf(x.rank) > 8)) {
      if (cards[0].rank === cards[1].rank) {
        console.log('all in');
        return allIn;
      }
      console.log('raise');
      return raise;
    }

    if (preFlop) {
      console.log('call');
      return call;
    }

    return 0;
  },

  myPlayer: function(gamestate) {
    return gamestate.players[gamestate.me];
  }
};
