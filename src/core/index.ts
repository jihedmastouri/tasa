import { parentPort, isMainThread } from 'worker_threads';
import { Core } from './core';
import { msg, msg_get, msg_set } from 'client/types';

if (isMainThread || !parentPort) {
  throw new Error('You can not run this as the maun thread');
}

const core = new Core();

parentPort.on('message', (data: msg) => {
  switch (data.event) {
    case 'new':
      core.new(data.entity);
      break;
    case 'set': {
      const { entity, key, value } = data as msg_set;
      const b = new BroadcastChannel(`get-${entity}`);
      console.log(`core.set(${entity}, ${key}, ${value})`);
      b.postMessage(core.set(entity, key, value));
      break;
    }
    case 'get': {
      const { entity, key } = data as msg_get;
      const b = new BroadcastChannel(`set-${entity}`);
      b.postMessage(core.get(entity, key));
      break;
    }
  }
});
