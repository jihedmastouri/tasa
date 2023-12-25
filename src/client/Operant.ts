import { ChildProcess } from "child_process";
import { fileURLToPath } from "node:url";
import path from "path";
import { BroadcastChannel, Worker } from "worker_threads";
import { OperantType, Receiver, Sender } from "../types.js";
import { getChanName } from "../utils.js";

export class Operant {
	private _operant: Worker | ChildProcess;
	private _type: OperantType;
	private channels: Record<string, BroadcastChannel> = {};

	get type(): string {
		return this._type;
	}

	constructor(type: OperantType) {
		this._type = type;
		//@ts-ignore
		const __filename = fileURLToPath(import.meta.url);

		switch (this._type) {
			case "Worker":
				this._operant = new Worker(
					path.join(path.dirname(__filename), "..", "core", "worker.js"),
					{
						workerData: {},
					},
				);
				break;
			case "ChildProcess":
				throw "Child Process Not Supported yet";
		}
	}

	postMessage(msg: Sender) {
		switch (this._type) {
			case "Worker": {
				const channelName = getChanName(msg.event, msg.entity);
				this.channels[channelName] = new BroadcastChannel(channelName);
				(this._operant as Worker).postMessage(msg);
				break;
			}
		}
	}

	on(chan: Omit<Receiver, "value">, callback: (data: unknown) => void) {
		switch (this._type) {
			case "Worker": {
				const channelName = getChanName(chan.event, chan.entity);
				this.channels[channelName].onmessage = (value) => {
					callback(value);
					this.channels[channelName].close();
				};

				delete this.channels[channelName];
			}
			break;
		}
	}

	kill() {
		switch (this._type) {
			case "Worker": {
				for (const [_, channel] of Object.entries(this.channels)) {
					channel.close();
				}
				return (this._operant as Worker).terminate();
			}
		}
	}
}
