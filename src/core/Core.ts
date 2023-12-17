export class Core {
	private entities: Record<string, Map<string, unknown>>;

	constructor() {
		this.entities = {};
		// biome-ignore lint/correctness/noConstructorReturn: <Returning a proxy>
		return new Proxy(this, {
			get(target, prop) {
				//@ts-ignore
				const origMethod = target[prop];
				if (typeof origMethod === "function") {
					//@ts-ignore
					return (...args) => {
						if (target.entities[args[0]] === undefined && args.length > 1) {
							console.debug(`"${args[0]}" is not a registered entity`);
							throw 404;
						}
						return origMethod.apply(target, args);
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

	forEach(
		name: string,
		fn: (entryName: string, value: unknown) => undefined | unknown,
	) {
		for (const [entryName, value] of this.entities[name]) {
			this.entities[name].set(entryName, fn(entryName, value) ?? value);
		}
	}
}
