import { Operant } from './Operant';
import { Tasa } from './Tasa';

export class Entity {
  private _name: string;
  private operant: Operant;
  private parent: Tasa;

  constructor(parent: Tasa, name: string, operant: Operant) {
    this.parent = parent;
    this.operant = operant;
    this._name = name;
    this.operant.postMessage({ event: 'new', entity: name });
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
      this.operant.postMessage({ event: 'set', entity: this.name, key, value });
      console.debug(`Entity.set(${this.name}, ${key}, ${value})`);
      this.operant.on("",() => {
        console.log("Entity.set()");
        resolve(true);
      });
    });
  }

  /**
   * Retrieves the value of a key.
   * @param {string} key - The key.
   * @returns {Promise<unknown>} The value.
   * @throws {Error} If the key does not exist.
   */
  get(key: string): unknown {
    this.operant.postMessage({ event: 'get', entity: this.name, key });
    return new Promise((resolve, _) => {
      this.operant.on("", (event) => {
        console.log("Entity.set()");
        resolve(event);
      });
    });
  }

  /**
   * Advanced query.
   * @returns {Query} The Query object.
   * @throws {Error} If the entity does not exist.
   */
  query(): Query {
    console.debug("Entity.query()");
    return new Query();
  }

  /**
   * Retrieves a list of keys.
   * @returns {Promise<string[]>} The list of keys.
   * @throws {Error} If the entity does not exist.
   */
  keys(): Promise<string[]> {
    console.debug("Entity.keys()");
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
  clean(): Promise<boolean> {
    console.debug("Entity.clean()");
    return Promise.resolve(false);
  }

  /**
   * Deletes all entries.
   * @returns {Promise<boolean>} True if the entity was droped, False otherwise.
   * @throws {Error} If the entity does not exist.
   */
  drop(): Promise<boolean> {
    console.debug("Entity.drop()");
    this.parent._dropEntity(this._name);
    return Promise.resolve(false);
  }
}
