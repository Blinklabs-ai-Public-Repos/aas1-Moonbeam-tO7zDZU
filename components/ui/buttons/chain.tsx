"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useWallet from "@/hooks/wallet/useWallet";

import { Button } from "./button";

import config from "@/uiconfig.json";
import { LINKS, chains } from "@/constants/common";

const ChainButton = () => {
  const [currentChainId, setCurrentChainId] = useState<number>(0);
  const { switchChain } = useWallet();
  const chainInfo = chains[currentChainId as keyof typeof chains];

  const onSwitchChain = async () => {
    try {
      await switchChain(config.chainId.toString(16));
      setCurrentChainId(config.chainId);
    } catch (error) {
      console.log({ error });
    }
  };

  if (window) {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId: string) => {
        setCurrentChainId(parseInt(chainId, 16));
      });
    } else {
      return (
        <Link href={LINKS.METAMASK} target="_blank_">
          <Button className="text-white font-semibold">Install Metamask</Button>
        </Link>
      );
    }
  }

  return (
    <Button
      className="bg-primary text-white flex gap-2 items-center px-4 py-2 rounded-md"
      onClick={onSwitchChain}
    >
      {currentChainId === config.chainId ? (
        <>
          <Image
            src={chainInfo.logoUrl}
            width={24}
            height={24}
            alt="chain-logo"
            className="rounded-full"
          />
          <p className={"font-semibold"}>{chainInfo.name}</p>
        </>
      ) : (
        <p className={"font-semibold"}>Switch Chain</p>
      )}
    </Button>
  );
};

export default ChainButton;
