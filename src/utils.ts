import { AllowedEvents } from "src/types";

export function getChanName(eventName: AllowedEvents, entityName: string) {
	return `${eventName}-${entityName}`;
}
