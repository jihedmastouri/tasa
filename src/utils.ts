import { AllowedEvents } from "./types.js";

export function getChanName(eventName: AllowedEvents, entityName: string) {
	return `${eventName}-${entityName}`;
}
