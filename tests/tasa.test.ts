import { describe, it } from 'node:test';
import assert from 'node:assert';

import { Tasa } from '../src/client';
import { Core } from '../src/core/core';

describe('Testing threads, messages and other core functions', () => {

  it('Tasa: Main APIs', () => {
    const tasa = new Tasa();
    const user = tasa.new('users');

    assert.equal(tasa.list(), ['users', 'posts'], 'Entities Creation');

    assert.throws(() => {
      const _ = tasa.new('users');
    }, 'Recreating user entity should throw an error');

    assert.deepEqual(tasa.get('users'), user, 'Get User Entity');

    tasa.dropEntity('users');
    assert.deepEqual(tasa.list(), ['posts', 'comments'], 'Drop User Entity');

    tasa.dropAllEntities();
    assert.equal(tasa.list().length, 0, 'Drop All Entities');
  });

  it('Core: Main APIs | set, get and delete', () => {
    const core = new Core();
    core.new('users');

    core.set('users', 'foo', 'fizzbuzz');
    core.set('users', 'foo', [5, 67, 8, 7]);
    core.set('users', 'bar', 56);

    assert.equal(core.get('users', 'foo'), [5, 67, 8, 7]);
    assert.equal(core.get('users', 'bar'), 56);

    core.delete('users', 'foo');
    assert.equal(core.get('users', 'foo'), undefined);

    core.clean('users');
    assert.equal(core.get('users', 'bar'), undefined);

    /* check setting something that doesn't exist */
    core.set('posts', 'foo', 'fizzbuzz');

  });

  it('Core: Main APIs | foreach', () => {
    const core = new Core();
    core.set('comments', 'foo', 'fizz');
    core.set('comments', 'bar', 'buzz');
    core.set('comments', 'baz', 'fizzbuzz');

    core.forEach('comments', (el) => {
      switch (el) {
        case 'fizz':
          el = 3;
          break;
        case 'buzz':
          el = 5;
          break;
        case 'fizzbuzz':
          el = 35;
          break;
      }
    });

    assert.equal(core.get('comments', 'foo'), 3);
    assert.equal(core.get('comments', 'bar'), 5);
    assert.equal(core.get('comments', 'baz'), 35);
  });
});
