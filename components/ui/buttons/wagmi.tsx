"use client";

import React, { useEffect, useState } from "react";
import { Config, useConnect } from "wagmi";
import useWallet from "@/hooks/wallet/useWallet";
import { ConnectMutate } from "wagmi/query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/buttons/button";

import { shortenAddress } from "@/lib/utils";

const WagmiConnectWalletButton = () => {
  const { connectors } = useConnect();
  const { address } = useWallet();
  const connect = useWallet().connect as ConnectMutate<Config, unknown>;
  const [buttonLabel, setButtonLabel] = useState("Connect");

  useEffect(() => {
    setButtonLabel(shortenAddress(address as `0x${string}`));
  }, [address]);

  if (typeof window !== "undefined" && !window.ethereum) {
    return null;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="bg-primary text-white text-sm font-semibold h-10 px-4 py-2 rounded-md w-[140px]">
          {buttonLabel}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold mb-4">
              Connect Wallet
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              {connectors.map((connector) => (
                <Button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                </Button>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WagmiConnectWalletButton;
