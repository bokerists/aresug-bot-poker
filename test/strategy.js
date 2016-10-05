'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const player = require('../player');

const gamestateFactory = (common, cards, chips, call, raise) => ({
  'commonCards': common,
  'players': [
    {
      'id': 0,
      'name': 'Arale',
      'status': 'active',
      'cards': cards,
      'chips': chips,
      'chipsBet': 0
    }
  ],
  'db': 2,
  'me': 0,
  'callAmount': call,
  'minimumRaiseAmount': raise
});

describe('- Strategy -', () => {
  it('should raise if 2 figures or aces', () => {
    const gamestate = gamestateFactory([], [
      {
        'rank': 'K',
        'type': 'C'
      },
      {
        'rank': 'A',
        'type': 'H'
      }
    ], 500, 50, 100);
    const bet = player.bet(gamestate);

    expect(bet).to.be.above(50);
  });

  it('should go all in if high pair', () => {
    const gamestate = gamestateFactory([], [
      {
        'rank': 'K',
        'type': 'C'
      },
      {
        'rank': 'K',
        'type': 'H'
      }
    ], 500, 50, 100);
    const bet = player.bet(gamestate);

    expect(bet).to.equal(500);
  });

  it('should go all in if tris', () => {
    const gamestate = gamestateFactory(
      [
        {
          'rank': 'K',
          'type': 'D'
        }
      ],
      [
        {
          'rank': 'K',
          'type': 'C'
        },
        {
          'rank': 'K',
          'type': 'H'
        }
      ], 500, 50, 100);
    const bet = player.bet(gamestate);

    expect(bet).to.equal(500);
  });

  it('should fold otherwise', () => {
    const gamestate = gamestateFactory([''], [
      {
        'rank': '2',
        'type': 'C'
      },
      {
        'rank': 'K',
        'type': 'H'
      }
    ], 500, 50, 100);
    const bet = player.bet(gamestate);

    expect(bet).to.equal(0);
  });
});
