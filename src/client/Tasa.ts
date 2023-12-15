import { Entity } from "./Entity.js";
import { Operant } from "./Operant.js";
import { OperantType } from "../types.js";

export class Tasa {
	private entities: Record<string, Entity>;
	private operant: Operant;

	constructor(operantType: OperantType = "Worker") {
		this.entities = {};
		this.operant = new Operant(operantType);
	}

	/**
	 * Creates a new entity with the specified name.
	 * @param {string} entityName - The name of the entity.
	 * @returns {Entity} The entity.
	 * @throws {Error} if the entity already exists.
	 */
	new(entityName: string): Entity {
		console.debug(`Creating new entity: ${entityName}`);

		const entity = new Entity(this, entityName, this.operant);
		this.entities[entityName] = entity;
		return entity;
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
	 * @returns {Entity} The entity.
	 */
	get(entityName: string): Entity {
		return this.entities[entityName];
	}

	/**
	 * Deletes an entity.
	 * Same as Entity.drop()
	 * @param {string} entityName - The name of the entity.
	 * @returns {Promise<boolean>} True if the entity was deleted, false otherwise.
	 */
	dropEntity(entityName: string): Promise<boolean> {
		return this.entities[entityName].drop();
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
			Object.entries(this.entities).map(([_, entity]) => entity.drop()),
		);
	}
}
