import { ethers } from "ethers";
import { readContract } from "@wagmi/core";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { TokenContractFactory } from "@/lib/contracts/TokenContractFactory";

import { Address } from "@/types";
import { wagmiConfig } from "@/configs/wagmi";
import { LIBS } from "@/constants/common";
import config from "@/uiconfig.json";
import { QUERY_KEYS } from "@/constants/queryKeys";

const queryClient = new QueryClient();

export default () => {
  const contractAddress = config.contractAddress as `0x${string}`;
  const abi = config.abi;

  const ethersjs = () => {
    const nameFn = async () => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const name = await contract.name();
        return name;
      } catch (error) {
        return "";
      }
    };

    const symbolFn = async () => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const symbol = await contract.symbol();
        return symbol;
      } catch (error) {
        return "";
      }
    };

    const balanceOfFn = async ({
      walletAddress,
    }: {
      walletAddress: Address;
    }) => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const balance = await contract.balanceOf(walletAddress);
        return balance;
      } catch (error) {
        return 0;
      }
    };

    const tokenSupplyFn = async () => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const tokenSupply = await contract.cap();
        return tokenSupply;
      } catch (error) {
        return 0;
      }
    };

    const decimalsFn = async () => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const tokenSupply = await contract.decimals();
        return tokenSupply;
      } catch (error) {
        return 0;
      }
    };

    const mintFn = async ({ to, amount }: { to: string; amount: number }) => {
      try {
        const signer = await new ethers.BrowserProvider(
          window.ethereum
        ).getSigner();
        const contract = TokenContractFactory.connect(contractAddress, signer);
        const tx = await contract.mint(to, amount);
        await tx.wait();
      } catch (error) {
        console.log({ error });
      }
    };

    const { data: name, isLoading: isLoadingName } = useQuery({
      queryKey: [QUERY_KEYS.NAME],
      queryFn: nameFn,
    });

    const { data: symbol, isLoading: isLoadingSymbol } = useQuery({
      queryKey: [QUERY_KEYS.SYMBOL],
      queryFn: symbolFn,
    });

    const { data: tokenSupply, isLoading: isLoadingTokenSupply } = useQuery({
      queryKey: [QUERY_KEYS.TOKEN_SUPPLY],
      queryFn: tokenSupplyFn,
    });

    const { data: decimals, isLoading: isLoadingDecimals } = useQuery({
      queryKey: [QUERY_KEYS.DECIMALS],
      queryFn: decimalsFn,
    });

    const balanceOf = (walletAddress: Address) =>
      useQuery({
        queryKey: [QUERY_KEYS.BALANCE],
        queryFn: () => balanceOfFn({ walletAddress }),
      });

    const mint = useMutation({
      mutationFn: mintFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BALANCE] });
      },
      onError: () => {},
    });

    const loading =
      isLoadingTokenSupply ||
      isLoadingName ||
      isLoadingSymbol ||
      isLoadingDecimals;

    return {
      loading,
      name,
      symbol,
      tokenSupply: tokenSupply ? tokenSupply.toString(10) : 0,
      decimals: decimals ? decimals : 0,
      balanceOf,
    };
  };

  const wagmi = () => {
    const nameFn = async () => {
      try {
        const name = await readContract(wagmiConfig, {
          abi,
          address: contractAddress,
          functionName: "name",
        });
        return name as string;
      } catch (error) {
        return "";
      }
    };

    const symbolFn = async () => {
      try {
        const symbol = await readContract(wagmiConfig, {
          abi,
          address: contractAddress,
          functionName: "symbol",
        });
        return symbol as string;
      } catch (error) {
        return "";
      }
    };

    const tokenSupplyFn = async () => {
      try {
        const tokenSupply = await readContract(wagmiConfig, {
          abi,
          address: contractAddress,
          functionName: "cap",
        });
        return tokenSupply as number;
      } catch (error) {
        return 0;
      }
    };

    const decimalsFn = async () => {
      try {
        const decimals = await readContract(wagmiConfig, {
          abi,
          address: contractAddress,
          functionName: "decimals",
        });
        return decimals as number;
      } catch (error) {
        return 0;
      }
    };

    const balanceOfFn = async ({}) => {
      try {
        const balance = await readContract(wagmiConfig, {
          abi,
          address: contractAddress,
          functionName: "balanceOf",
        });
        if (!balance) return "0";
        return balance.toString();
      } catch (error) {
        return 0;
      }
    };

    const { data: name, isLoading: isLoadingName } = useQuery({
      queryKey: [QUERY_KEYS.NAME],
      queryFn: nameFn,
    });

    const { data: symbol, isLoading: isLoadingSymbol } = useQuery({
      queryKey: [QUERY_KEYS.SYMBOL],
      queryFn: symbolFn,
    });

    const { data: tokenSupply, isLoading: isLoadingTokenSupply } = useQuery({
      queryKey: [QUERY_KEYS.TOKEN_SUPPLY],
      queryFn: tokenSupplyFn,
    });

    const { data: decimals, isLoading: isLoadingDecimals } = useQuery({
      queryKey: [QUERY_KEYS.DECIMALS],
      queryFn: decimalsFn,
    });

    const balanceOf = (walletAddress: Address) =>
      useQuery({
        queryKey: [QUERY_KEYS.BALANCE],
        queryFn: () => balanceOfFn({ walletAddress }),
      });

    const loading =
      isLoadingTokenSupply ||
      isLoadingName ||
      isLoadingSymbol ||
      isLoadingDecimals;

    return {
      loading,
      name,
      symbol,
      tokenSupply: tokenSupply ? tokenSupply.toString(10) : 0,
      decimals: decimals ? decimals : 0,
      balanceOf,
    };
  };

  switch (config.lib) {
    case LIBS.ETHERS:
      return {
        ...ethersjs(),
      };
    default:
      return {
        ...wagmi(),
      };
  }
};
