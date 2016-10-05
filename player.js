
exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  bet: function (gamestate) {

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

    const me = gamestate.players[gamestate.me];

    const cards = me.cards;

    if (cards.every(x => x.rank === 'A')) {
      return gamestate.callAmount;
    }

    return 0;

  }

};
