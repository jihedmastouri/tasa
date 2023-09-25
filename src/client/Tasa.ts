import { Worker } from 'worker_threads';
import path from 'node:path';
import { Entity } from './Entity';

export class Tasa {
  private entities: Record<string, Entity>;
  private worker: Worker;

  constructor() {
    this.entities = {};
    this.worker = new Worker(path.join(__dirname, '..', 'core', 'index.js'), { workerData: {} });
  }

  /**
   * Creates a new entity with the specified name.
   * @param {string} entityName - The name of the entity.
   * @returns {Entity} The entity.
   */
  new(entityName: string): Entity {
    console.log(`Creating new entity: ${entityName}`);
    const entity = new Entity(entityName, this.worker);
    this.entities[entityName] = entity;
    return entity;
  }

  /**
   * Retrieves a list of entities.
   * @returns {string[]} The list of entities.
   */
  list(): string[] {
    // TODO: Retrieve the list of entities from the Tasa-thread.
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
   * @returns {boolean} True if the entity was deleted, false otherwise.
   */
  dropEntity(entityName: string): boolean {
    if (this.entities[entityName]) {
      delete this.entities[entityName];
      return true;
    }
    return false;
  }

  /**
   * Deletes all entities.
   * @returns {Promise<boolean>} True if all entities were deleted, False otherwise.
   */
  dropAllEntities(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
