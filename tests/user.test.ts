import { Tasa } from '../src/client';
import { describe, it } from 'node:test';

describe('Testing end-user API: Full scenario', () => {
  it('Create a Tasa instance and some entities', () => {
    const tasa = new Tasa();
    const user = tasa.new('users');
    const posts = tasa.new('posts');
    const comments = tasa.new('users');
  });
});
