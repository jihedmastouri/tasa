import { BroadcastChannel } from 'worker_threads';
import type { Worker } from 'worker_threads';

export class Entity {
  private _name: string;
  private worker: Worker;
  private b_get: BroadcastChannel;
  private b_set: BroadcastChannel;

  constructor(name: string, worker: Worker) {
    this.worker = worker;
    this._name = name;
    this.worker.postMessage({ event: 'new', entity: name });
    this.b_get = new BroadcastChannel(`get-${this.name}`);
    this.b_set = new BroadcastChannel(`set-${this.name}`);
  }

  get name(): string {
    return this._name;
  }

  /**
   * Sets the value of a key.
   * @param {string} key - The key.
   * @param {unknown} value - The value.
   * @returns {Promise<boolean>} True if the key was set, False otherwise.
   * @throws {Error} If the entity does not exist.
   */
  set(key: string, value: unknown): Promise<boolean> {
    return new Promise((resolve, _) => {
      this.worker.postMessage({ event: 'set', entity: this.name, key, value });
      console.log(`Entity.set(${this.name}, ${key}, ${value})`);
      this.b_set.onmessage = (event) => {
        console.log(`Entity.set()`);
        // @ts-ignore
        resolve(event.data);
      };
    });
  }

  /**
   * Retrieves the value of a key.
   * @param {string} key - The key.
   * @returns {Promise<unknown>} The value.
   * @throws {Error} If the key does not exist.
   * @throws {Error} If the entity does not exist.
   */
  get(key: string): unknown {
    this.worker.postMessage({ event: 'get', entityName: this.name, key });
    return new Promise((resolve, _) => {
      this.b_get.onmessage = (event) => {
        // @ts-ignore
        resolve(event.data);
      };
    });
  }

  /**
   * Advanced query.
   * @returns {Query} The Query object.
   * @throws {Error} If the entity does not exist.
   */
  query(): Query {
    console.log(`Entity.query()`);
    return new Query();
  }

  /**
   * Retrieves a list of keys.
   * @returns {Promise<string[]>} The list of keys.
   * @throws {Error} If the entity does not exist.
   */
  keys(): Promise<string[]> {
    console.log(`Entity.keys()`);
    return Promise.resolve([]);
  }

  /**
   * Deletes a key.
   * @param {string} key - The key.
   * @returns {Promise<boolean>} True if the key was deleted, False otherwise.
   * @throws {Error} If the entity does not exist.
   */
  delete(key: string): Promise<boolean> {
    console.log(`Entity.delete(${key})`);
    return Promise.resolve(false);
  }

  /**
   * Deletes all entries.
   * @returns {Promise<boolean>} True if the entity was droped, False otherwise.
   * @throws {Error} If the entity does not exist.
   */
  deleteAll(): Promise<boolean> {
    console.log(`Entity.delete()`);
    return Promise.resolve(false);
  }
}
