import { Operant } from "src/client/Operant";
import { Tasa } from "src/client/Tasa";

export class Entity {
	private _name: string;
	private operant: Operant;
	private parent: Tasa;

	constructor(parent: Tasa, name: string, operant: Operant) {
		this.parent = parent;
		this.operant = operant;
		this._name = name;
		this.operant.postMessage({ event: "new", entity: name });
	}

	get name(): string {
		return this._name;
	}

	/**
	 * Sets the value of a key.
	 * @param  key - The key.
	 * @param value - The value.
	 * @returns a Promise with the value when resolved and an error message if rejected.
	 */
	set(key: string, value: unknown): Promise<unknown | string> {
		return new Promise((resolve, reject) => {
			console.debug(`Entity.set(${this.name}, ${key}, ${value})`);

			this.operant.postMessage({
				event: "set",
				entity: this.name,
				key,
				value,
			});

			this.operant.on({ entity: this.name, event: "set" }, (data) => {
				console.log("Entity.set()");
				if (data) resolve(value);
				reject("failed!");
			});
		});
	}

	/**
	 * Retrieves the value of a key.
	 * @param key - The key.
	 * @returns a Promise with the value when resolved and an error message if rejected.
	 */
	get(key: string): Promise<unknown | string> {
		this.operant.postMessage({ event: "get", entity: this.name, key });

		return new Promise((resolve, reject) => {
			this.operant.on({ entity: this.name, event: "get" }, (data) => {
				console.log("Entity.set()");
				if (!data) reject("failed!");
				resolve(data);
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
		this.parent.__dropEntity(this._name);
		return Promise.resolve(false);
	}
}
