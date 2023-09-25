// import test from 'node:test';
// import assert from 'node:assert';
//
// import { Tasa } from './client/Tasa';
//
// test('Tasa.new() creates a new entity', async () => {
//   const tasa = new Tasa();
//   const u = tasa.new('user');
//   const foo = await u.set('name', 'John');
//   console.log(`foo: ${foo}`)
//   const name = await u.get('name');
//   assert(name === 'John');
// });

import { Tasa } from './index';

async function run() {

  const tasa = new Tasa();
  const u = tasa.new('user');

  const foo = await u.set('name', 'John');
  console.log(`foo: ${foo}`)

  const name = await u.get('name');
  console.log(`name: ${name}`)
}

run();
