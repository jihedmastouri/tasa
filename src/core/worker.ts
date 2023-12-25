import { BroadcastChannel, isMainThread, parentPort } from "worker_threads";

import { MsgGet, MsgSet, Sender } from "../types.js";
import { getChanName } from "../utils.js";
import { Core } from "./Core.js";

if (isMainThread || !parentPort) {
	throw new Error("You can not run this as the main thread");
}

const core = new Core();

const foo = parentPort.on("message", (data: Sender) => {
	switch (data.event) {
		case "new":
			core.new(data.entity);
			break;

		case "set": {
			const pong = ponger(data);
			const { entity, key, value } = data as MsgSet;
			try {
				core.set(entity, key, value);
			} catch {
				pong();
			} finally {
				pong(true);
			}
			break;
		}

		case "get": {
			const pong = ponger(data);
			const { entity, key } = data as MsgGet;
			try {
				const value = core.get(entity, key);
				pong(value);
			} catch {
				pong();
				break;
			}
		}
	}
});

function ponger(data: Sender) {
	const { entity, event: eventName } = data as MsgSet;
	const b = new BroadcastChannel(getChanName(eventName, entity));
	return (value?: unknown) => {
		b.postMessage(value);
	};
}
