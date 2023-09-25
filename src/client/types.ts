export type msg_base = {
  event: string;
  entity: string;
}

export type msg_set = msg_base & {
  event: 'set';
  key: string;
  value: unknown;
}

export type msg_get = msg_base & {
  event: 'get';
  key: string;
}

export type msg = msg_set | msg_get | msg_base;
