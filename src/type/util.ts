export type Constructor<T = {}> = new (...args: any[]) => T;

export type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};
