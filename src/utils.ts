import { AllowedEvents } from "types";

export function getChanName(eventName: AllowedEvents, entityName: string) {
	return `${eventName}-${entityName}`;
}
