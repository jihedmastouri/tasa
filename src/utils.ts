import { AllowedEvents } from "./types.js";

export function getChanName(eventName: AllowedEvents, entityName: string) {
	return `${eventName}-${entityName}-${Math.floor(Math.random() * 1000)}`;
}
