import assert from "node:assert";
import { describe, it } from "node:test";

import { Tasa } from "../src/client/index.js";
import { Core } from "../src/core/Core.js";

describe.skip("Testing threads, messages and other core functions", () => {
	it("Tasa: Main APIs", async () => {
		const tasa = new Tasa();

		const user = tasa.new("users");
		const posts = tasa.new("posts");

		assert.deepEqual(tasa.list(), ["users", "posts"], "Entities Creation");

		const newRef = tasa.getRef("users");
		assert.equal(newRef, user, "Get User Entity");

		// await tasa.dropEntity("users");
		// assert.deepEqual(tasa.list(), ["posts"], "Drop User Entity");

		// await tasa.dropAllEntities();
		// assert.equal(tasa.list().length, 0, "Drop All Entities");

		// const comments = tasa.new("comments");
		const n = await tasa.kill();
		assert.equal(n, 0, "Thread killed");
		// tasa.reinit();
	});

	it("Core: Main APIs | set, get and delete", () => {
		const core = new Core();
		core.new("users");

		core.set("users", "foo", "fizzbuzz");
		core.set("users", "foo", [5, 67, 8, 7]);
		core.set("users", "bar", 56);

		assert.deepEqual(core.get("users", "foo"), [5, 67, 8, 7]);
		assert.equal(core.get("users", "bar"), 56);

		core.delete("users", "foo");
		assert.equal(core.get("users", "foo"), undefined);

		core.clean("users");
		assert.throws(() => {
			core.get("users", "bar");
		}, "Getting an entity that doesn't exit / Deleting an entity");

		assert.throws(() => {
			core.set("posts", "foo", "fizzbuzz");
		}, "Setting a value to an entity that doesn't exit");
	});

	it("Core: Main APIs | foreach", () => {
		const names = ["foo", "bar", "baz"];
		const entityName = "comments";

		const original = ["fizz", "buzz", "fizzbuzz"];
		const res = ["3", "5", "15"];

		const core = new Core();
		core.new(entityName);

		for (let i = 0; i < names.length; i++) {
			core.set(entityName, names[i], original[i]);
		}

		// biome-ignore lint/complexity/noForEach: <this how we do it 🎶>
		core.forEach(entityName, (_, val) => {
			const index = original.indexOf(val as string);
			if (index !== -1) {
				return res[index];
			}
		});

		for (let i = 0; i < names.length; i++) {
			assert.equal(core.get(entityName, names[i]), res[i]);
		}
	});
});
