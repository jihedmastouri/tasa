import { OperantType } from "../types.js";
import { Entity } from "./Entity.js";
import { Operant } from "./Operant.js";

export class Tasa {
	private entities: Record<string, Entity>;
	private operant: Operant | null;

	/**
	 * @param {("Worker"|"ChildProcess")} operantType - operant is where the work is going to be executed.
	 */
	constructor(operantType: OperantType = "Worker") {
		this.entities = {};
		this.operant = new Operant(operantType);
	}

	/**
	 * Creates a new entity with the specified name.
	 * @param {string} entityName - The name of the entity.
	 * @returns {Entity} - A new entity or a ref to an existing one.
	 */
	new(entityName: string):Entity {
		if (this.operant === null)
			throw "Operant is null. You need to reinit() first";

		if (this.entities[entityName] !== undefined) {
			return this.entities[entityName];
		}

		const entity = Entity(this, entityName, this.operant);
		this.entities[entityName] = entity;
		return entity;
	}

	/**
	 * Re-initiate the worker thread or child process.
	 * @param {("Worker"|"ChildProcess")} operantType - operant is where the work is going to be executed.
	 * @throws {Error} if there's an operant attached to this instance of `Tasa`.
	 */
	reinit(operantType: OperantType = "Worker") {
		if (this.operant !== null) {
			throw `there's a ${this.operant.type} already running. You need to kill() it first`;
		}
		this.operant = new Operant(operantType);
	}

	/**
	 * Retrieves a list of entities.
	 * @returns {string[]} The list of entities.
	 */
	list(): string[] {
		return Object.keys(this.entities);
	}

	/**
	 * Retrieves an entity.
	 * @param {string} entityName - The name of the entity.
	 * @returns {Entity} - The entity.
	 */
	getRef(entityName: string): Entity {
		return this.entities[entityName];
	}

	/**
	 * Deletes an entity.
	 * Same as Entity.drop()
	 * @param {string} entityName - The name of the entity.
	 * @returns {Promise<void>} throws an error if it fails.
	 */
	dropEntity(entityName: string): Promise<void> {
		if (this.entities[entityName] === undefined) return Promise.reject();
		return this.entities[entityName].current.drop();
	}

	__dropEntity(entityName: string) {
		if (this.entities[entityName]) {
			delete this.entities[entityName];
		}
	}

	/**
	 * Deletes all entities.
	 */
	dropAllEntities() {
		return Promise.allSettled(
			Object.entries(this.entities).map(([_, entity]) => entity.current.drop()),
		);
	}

	/**
	 * Terminates the separate thread and deletes all entities.
	 * @returns {Promise<number>} throws an error if it fails.
	 */
	kill(): Promise<number> {
		return new Promise((res, rej) => {
			this.entities = {};
			if (this.operant === null) rej();
			this.operant
				?.kill()
				.then((n) => {
					this.operant = null;
					res(n);
				})
				.catch(rej);
		});
	}
}
