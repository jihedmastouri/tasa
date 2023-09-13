// TODO: Implement the Entity class.
class Entity {
  name: string
  constructor(name: string) {
    // TODO: Initialize the entity in the Tassa-Thread.
    this.name = name
  }

  /**
    * Drop the entity.
    * @returns {Promise<boolean>} True if the entity was droped, False otherwise.
    * @throws {Error} If the entity does not exist.
    */
  drop(): Promise<boolean> {
    console.log(`Entity.delete()`)
    return Promise.resolve(false)
  }

  /**
    * Retrieves a list of keys.
    * @returns {Promise<string[]>} The list of keys.
    * @throws {Error} If the entity does not exist.
    */
  keys(): Promise<string[]> {
    console.log(`Entity.keys()`)
    return Promise.resolve([])
  }

  /**
    * Retrieves the value of a key.
    * @param {string} key - The key.
    * @returns {Promise<unknown>} The value.
    * @throws {Error} If the key does not exist.
    * @throws {Error} If the entity does not exist.
    */
  get(key: string): unknown {
    console.log(`Entity.get(${key})`)
    return null
  }

  /**
    * Sets the value of a key.
    * @param {string} key - The key.
    * @param {unknown} value - The value.
    * @returns {Promise<boolean>} True if the key was set, False otherwise.
    * @throws {Error} If the entity does not exist.
    */
  set(key: string, value: unknown): Promise<boolean> {
    console.log(`Entity.set(${key}, ${value})`)
    return Promise.resolve(false)
  }

  /**
    * Deletes a key.
    * @param {string} key - The key.
    * @returns {Promise<boolean>} True if the key was deleted, False otherwise.
    * @throws {Error} If the entity does not exist.
    */
  delete(key: string): Promise<boolean> {
    console.log(`Entity.delete(${key})`)
    return Promise.resolve(false)
  }
}
