import { describe, it } from "node:test";
import assert from "node:assert";

import { Tasa } from "../src/client/index.js";

describe("Testing end-user API: Full scenario", () => {
	it("Create a Tasa instance and some entities", async () => {
		const tasa = new Tasa();
		const user = tasa.new("users");

		const setter = await user.current.set("foo", "bar");
		assert.equal(setter, "bar");

		const getter = await user.current.get("foo");
		assert.equal(getter, "bar");
	});
});
