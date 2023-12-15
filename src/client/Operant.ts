import { ChildProcess } from 'child_process';
import path from 'path';
import { Worker } from 'worker_threads';
import { Msg, OperantType } from './types';

export class Operant {
  private _operant: Worker | ChildProcess;
  private _type: OperantType;

  constructor(type: OperantType) {
    this._type = type;

    switch (this._type) {
      case 'Worker':
        this._operant = new Worker(path.join(__dirname, '..', 'core', 'index.js'), {
          workerData: {},
        });
        break;
      case 'ChildProcess':
        throw 'Child Process Not Supported yet';
    }
  }

  postMessage(msg: Msg) {
    return;
  }

  on(chan: string, callback: (data: unknown) => void) {}
}
