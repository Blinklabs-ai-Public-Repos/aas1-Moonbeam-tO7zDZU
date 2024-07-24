import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Config,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { ConnectMutate, DisconnectMutate } from "wagmi/query";
import { BrowserProvider } from "ethers";

import config from "@/uiconfig.json";
import { LIBS } from "@/constants/common";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { CHAINS } from "@/constants/chains";

const connectWithWagmi = () => {
  const chainId = useChainId();
  const chainInfo = CHAINS[chainId as keyof typeof CHAINS];
  const { switchChainAsync: switchChainWagmi } = useSwitchChain();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const switchChain = async (chainId: string) => {
    try {
      if (window.ethereum.chainId === chainId) return;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId}` }],
      });
      await switchChainWagmi({ chainId: parseInt(chainId, 16) });
    } catch (error) {
      if ((error as { code: number }).code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId}`,
                rpcUrls: [chainInfo.rpc],
                chainName: chainInfo.name,
                nativeCurrency: chainInfo.nativeCurrency,
              },
            ],
          });
          await switchChain(chainId);
        } catch (error) {
          throw new Error("Error addding chain");
        }
      }
      console.log("Error switching chain:", error);
      throw new Error("Error switching chain");
    }
  };

  return {
    chainId,
    address,
    isConnected,
    connect,
    disconnect,
    switchChain,
  };
};

const connectWithEthers = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.ADDRESS],
    enabled: false,
  });
  const address = data as `0x${string}`;
  const isConnected = !!address;
  const chainId = typeof window !== "undefined" && window.ethereum.chainId;
  const chainInfo = CHAINS[chainId as keyof typeof CHAINS];

  const connectFn = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = (await signer.getAddress()) as `0x${string}`;
    return address;
  };
  const queryClient = useQueryClient();
  const connect = useMutation({
    mutationFn: connectFn,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.ADDRESS], data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const disconnect = () => {
    queryClient.setQueryData([QUERY_KEYS.ADDRESS], null);
  };

  const switchChain = async (chainId: string) => {
    try {
      if (window.ethereum.chainId === chainId) return;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId}` }],
      });
    } catch (error) {
      if ((error as { code: number }).code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId}`,
                rpcUrls: [chainInfo.rpc],
                chainName: chainInfo.name,
                nativeCurrency: chainInfo.nativeCurrency,
              },
            ],
          });
          await switchChain(chainId);
        } catch (error) {
          throw new Error("Error addding chain");
        }
      }
      console.log("Error switching chain:", error);
      throw new Error("Error switching chain");
    }
  };
  return { chainId, address, isConnected, connect, disconnect, switchChain };
};

export default (): {
  chainId: number;
  address: string | null | undefined;
  isConnected: boolean;
  connect:
    | ConnectMutate<Config, unknown>
    | UseMutationResult<string, Error, void, unknown>;
  disconnect: DisconnectMutate<unknown> | (() => void);
  switchChain: (chainId: string) => Promise<void>;
} => {
  switch (config.lib) {
    case LIBS.ETHERS:
      return connectWithEthers();
    case LIBS.WAGMI:
      return connectWithWagmi();
    default:
      return {
        chainId: 0,
        address: "",
        isConnected: false,
        connect: () => {},
        disconnect: () => {},
        switchChain: () => new Promise(() => {}),
      };
  }
};
