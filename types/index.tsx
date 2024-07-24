import type { EventFilter } from "ethers";

type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never;

export interface TypedEvent<
  TArgsArray extends Array<any> = any,
  TArgsObject = any
> extends Event {
  args: TArgsArray & TArgsObject;
}

export interface TypedEventFilter<_TEvent extends TypedEvent>
  extends EventFilter {}

export interface TypedListener<TEvent extends TypedEvent> {
  (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void;
}

export type PromiseOrValue<T> = T | Promise<T>;

export type Address = `0x${string}`;

export interface Nft {
  id: number;
  tokenId: number;
  owner: `0x${string}` | null;
  name: string;
  fee: number;
  imgUrl: string;
}
