'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const player = require('../player');

let carteAlte;
let carteBasse;
let coppiaAlta;
beforeEach(() => {
  carteAlte = {
    'commonCards': [],
    'players': [
      {
        'id': 0,
        'name': 'Arale',
        'status': 'active',
        'cards': [
          {
            'rank': 'K',
            'type': 'C'
          },
          {
            'rank': 'A',
            'type': 'H'
          }
        ],
        'chips': 500,
        'chipsBet': 0
      }
    ],
    'db': 2,
    'me': 0,
    'callAmount': 50,
    'minimumRaiseAmount': 100
  };
  carteBasse = {
    'commonCards': [],
    'players': [
      {
        'id': 0,
        'name': 'Arale',
        'status': 'active',
        'cards': [
          {
            'rank': '2',
            'type': 'C'
          },
          {
            'rank': 'K',
            'type': 'H'
          }
        ],
        'chips': 500,
        'chipsBet': 0
      }
    ],
    'db': 2,
    'me': 0,
    'callAmount': 50,
    'minimumRaiseAmount': 100
  };
  coppiaAlta = {
    'commonCards': [],
    'players': [
      {
        'id': 0,
        'name': 'Arale',
        'status': 'active',
        'cards': [
          {
            'rank': 'K',
            'type': 'C'
          },
          {
            'rank': 'K',
            'type': 'H'
          }
        ],
        'chips': 500,
        'chipsBet': 0
      }
    ],
    'db': 2,
    'me': 0,
    'callAmount': 50,
    'minimumRaiseAmount': 100
  };
});

describe('- Strategy -', () => {
  it('should raise if 2 figures or aces', () => {
    const gamestate = carteAlte;
    const bet = player.bet(gamestate);

    expect(bet).to.be.above(gamestate.callAmount);
  });

  it('should go all in if high pair', () => {
    const gamestate = coppiaAlta;
    const bet = player.bet(gamestate);
    const allIn = gamestate.players[gamestate.me].chips;

    expect(bet).to.equal(allIn);
  });

  it('should fold otherwise', () => {
    const gamestate = carteBasse;
    const bet = player.bet(gamestate);

    expect(bet).to.equal(0);
  });
});
