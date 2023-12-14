import { parentPort, isMainThread } from 'worker_threads';
import { Core } from './core';
import { Msg, MsgGet, MsgSet } from 'client/types';

if (isMainThread || !parentPort) {
  throw new Error('You can not run this as the maun thread');
}

const core = new Core();

parentPort.on('message', (data: Msg) => {
  switch (data.event) {
    case 'new':
      core.new(data.entity);
      break;
    case 'set': {
      const { entity, key, value } = data as MsgSet;
      const b = new BroadcastChannel(`get-${entity}`);
      console.log(`core.set(${entity}, ${key}, ${value})`);
      b.postMessage(core.set(entity, key, value));
      break;
    }
    case 'get': {
      const { entity, key } = data as MsgGet;
      const b = new BroadcastChannel(`set-${entity}`);
      b.postMessage(core.get(entity, key));
      break;
    }
  }
});
