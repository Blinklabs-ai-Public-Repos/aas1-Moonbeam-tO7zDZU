import {
  BigNumberish,
  ContractFactory,
  Signer,
  Overrides,
  BaseContract,
  Interface,
  Listener,
  ContractRunner,
  ContractEventName,
  EventLog,
  Log,
  ContractTransaction,
  ContractTransactionResponse,
} from "ethers";
import {
  PromiseOrValue,
  TypedEvent,
  TypedEventFilter,
  TypedListener,
} from "@/types";

import metadata from "@/hardhat/artifacts/contracts/MyToken.sol/MyToken.json";

type TokenContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

export const isSuperArgs = (
  xs: TokenContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export interface TokenContractInterface extends Interface {}

export interface MintedEventObject {
  tokenId: number;
  to: string;
}

export type MintedEvent = TypedEvent<[BigNumberish, string], MintedEventObject>;

export type MintedEventFilter = TypedEventFilter<MintedEvent>;

export interface TokenContract extends BaseContract {
  connect(runner: ContractRunner): BaseContract;
  attach(addressOrName: string): BaseContract;
  deployed(): Promise<this>;

  interface: TokenContractInterface;

  queryFilter(
    event: ContractEventName,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<EventLog | Log>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(event?: ContractEventName | undefined): Promise<Listener[]>;
  removeAllListeners(event?: ContractEventName | undefined): Promise<this>;
  removeAllListeners(eventName?: string): this;
  off: (
    event: ContractEventName,
    listener?: Listener | undefined
  ) => Promise<this>;
  on: (event: ContractEventName, listener: Listener) => Promise<this>;
  once: (event: ContractEventName, listener: Listener) => Promise<this>;
  removeListener: (
    event: ContractEventName,
    listener: Listener
  ) => Promise<this>;

  functions: {
    name(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<string>;

    symbol(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<string>;

    decimals(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<number>;

    mint(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumberish>;

    cap(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumberish>;
  };

  name(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<string>;

  symbol(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<string>;

  decimals(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<number>;

  mint(
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransactionResponse>;

  balanceOf(
    owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BigNumberish>;

  cap(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BigNumberish>;
}

export class TokenContractFactory extends ContractFactory {
  constructor(...args: TokenContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(metadata.abi, metadata.bytecode, args[0]);
    }
  }
  override attach(address: string): TokenContract {
    return super.attach(address) as TokenContract;
  }
  override connect(signer: Signer): TokenContractFactory {
    return super.connect(signer) as TokenContractFactory;
  }
  static readonly bytecode = metadata.bytecode;
  static readonly abi = metadata.abi;
  static createInterface(): TokenContractInterface {
    return new Interface(metadata.abi) as TokenContractInterface;
  }
  static connect(address: string, signerOrProvider: Signer): TokenContract {
    return new BaseContract(
      address,
      metadata.abi,
      signerOrProvider
    ) as TokenContract;
  }
}
