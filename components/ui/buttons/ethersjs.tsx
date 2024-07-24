"use client";

import React from "react";
import useWallet from "@/hooks/wallet/useWallet";
import { UseMutationResult } from "@tanstack/react-query";

import { Button } from "@/components/ui/buttons/button";

import { shortenAddress } from "@/lib/utils";

const ConnectWalletButton = () => {
  const { address } = useWallet();
  const connect = useWallet().connect as UseMutationResult<
    string,
    Error,
    void,
    unknown
  >;

  const onConnect = () => {
    if (!connect) return;
    connect.mutate();
  };

  if (typeof window !== "undefined" && !window.ethereum) {
    return null;
  }

  return (
    <Button onClick={onConnect} className="w-[140px] bg-primary">
      {address ? shortenAddress(address as `0x${string}`) : "Connect"}
    </Button>
  );
};

export default ConnectWalletButton;
