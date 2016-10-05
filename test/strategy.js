'use strict';
const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const player = require('../player');

let sandbox;
beforeEach(() => sandbox = sinon.sandbox.create());
afterEach(() => sandbox.restore());

describe('- Strategy -', () => {
  it('should go all in if 2 figures or aces', () => {
    const gamestate = {
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
    const bet = player.bet(gamestate);
    const allIn = gamestate.players[gamestate.me].chips;
    expect(bet).to.eql(allIn);
  });

  it('should not go all in otherwise', () => {
    const gamestate = {
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
              'rank': '2',
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
    const bet = player.bet(gamestate);
    expect(bet).to.eql(0);
  });
});
