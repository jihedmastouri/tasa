type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type AllowedEvents =
	| "new"
	| "generic"
	| "set"
	| "get"
	| "delete"
	| "drop"
	| "foreach";

export type MsgBase = {
	event: AllowedEvents;
	entity: string;
};

export type MsgGeneric = Prettify<{
	event: "new" | "drop";
	entity: string;
}>;

export type MsgSet = Prettify<
	MsgBase & {
		event: "set";
		key: string;
		value: unknown;
	}
>;

export type MsgGet = Prettify<
	MsgBase & {
		event: "get";
		key: string;
	}
>;

export type MsgDelete = Prettify<
	MsgBase & {
		event: "delete";
		key: string;
	}
>;

export type MsgForeach = Prettify<
	MsgBase & {
		event: "foreach";
		fun: () => void;
	}
>;

export type Receiver = Prettify<
	MsgBase & {
		value: unknown;
	}
>;

export type Sender = MsgGeneric | MsgSet | MsgGet | MsgForeach | MsgDelete;

const operantType = {
	Worker: 0,
	ChildProcess: 1,
} as const;

export type OperantType = keyof typeof operantType;
