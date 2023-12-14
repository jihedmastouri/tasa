export class Core {
  private entities: Record<string, Map<string, unknown>>;

  constructor() {
    this.entities = {};
    return new Proxy(this, {
      get(target, prop) {
        //@ts-ignore
        const origMethod = target[prop];
        if (typeof origMethod == 'function') {
          //@ts-ignore
          return function (...args) {
            if (target.entities[args[0]] === undefined ) {
              console.debug(`"${args[0]}" is not a registered entity`)
              return;
            }
            let result = origMethod.apply(target, args);
            return result;
          };
        }
      },
    });
  }

  new(name: string) {
    this.entities[name] = new Map();
  }

  get(name: string, key: string) {
    return this.entities[name].get(key);
  }

  set(name: string, key: string, value: unknown) {
    this.entities[name].set(key, value);
  }

  delete(name: string, key: string) {
    return this.entities[name].delete(key);
  }

  clean(name: string) {
    delete this.entities[name];
  }

  forEach(name: string, fn: (entry: unknown) => void) {
    return this.entities[name].forEach(fn);
  }
}
