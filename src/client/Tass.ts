class Tass {
    private entities: Record<string, Entity>;

    constructor() {
      this.entities = {};
      // TODO: Initialize the Tassa-thread and establish communication.
    }

    /**
     * Creates a new entity with the specified name.
     * @param {string} entityName - The name of the entity.
     * @returns {Entity} The entity.
     */
    new(entityName: string): Entity {
      const entity = new Entity(entityName);
      this.entities[entityName] = entity;
      return entity;
    }

    /**
     * Retrieves a list of entities.
     * @returns {string[]} The list of entities.
     */
    list(): string[]{
      // TODO: Retrieve the list of entities from the Tassa-thread.
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
    dropAllEntities(): Promise<boolean>{
      return Promise.resolve(false);
    }
}

