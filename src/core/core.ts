export class Core {
  private entities: Record<string, Map<string, unknown>>;

  constructor() {
    this.entities = {};
  }

  new(name: string) {
    this.entities[name] = new Map();
  }

  get(name: string, key: string) {
    return this.entities[name].get(key);
  }

  set(name: string, key: string, value: unknown) {
    try {
      this.entities[name].set(key, value);
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }
}
