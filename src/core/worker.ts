import { BroadcastChannel, isMainThread, parentPort } from "worker_threads";

import { Sender, MsgGet, MsgSet } from "src/types";
import { Core } from "./Core";

if (isMainThread || !parentPort) {
	throw new Error("You can not run this as the main thread");
}

const core = new Core();

parentPort.on("message", (data: Sender) => {
	switch (data.event) {
		case "new":
			core.new(data.entity);
			break;
		case "set": {
			const { entity, key, value } = data as MsgSet;
			console.debug(`core.set(${entity}, ${key}, ${value})`);

			break;
		}
		case "get": {
			const { entity, key, event: eventName } = data as MsgGet;
			const b = new BroadcastChannel(getChanName(eventName, entity));
			break;
		}
	}
});
