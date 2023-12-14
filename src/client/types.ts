export type MsgBase = {
  event: string;
  entity: string;
};

export type MsgSet = MsgBase & {
  event: 'set';
  key: string;
  value: unknown;
};

export type MsgGet = MsgBase & {
  event: 'get';
  key: string;
};

export type Msg = MsgSet | MsgGet | MsgBase;

const operantType = {
  Worker: 0,
  ChildProcess: 1,
} as const;

export type OperantType = keyof typeof operantType;
