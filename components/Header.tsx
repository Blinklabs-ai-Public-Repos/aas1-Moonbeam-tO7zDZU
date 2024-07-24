"use client";

import React from "react";
import dynamic from "next/dynamic";

import config from "@/uiconfig.json";
import { LIBS } from "@/constants/common";

const ChainButton = dynamic(() => import("@/components/ui/buttons/chain"), {
  ssr: false,
});

const Header = () => {
  const ConnectButton =
    config.lib === LIBS.WAGMI
      ? dynamic(() => import("@/components/ui/buttons/wagmi"), {
          ssr: false,
        })
      : dynamic(() => import("@/components/ui/buttons/ethersjs"), {
          ssr: false,
        });
  return (
    <div className="w-full flex gap-2 justify-between p-4">
      <div className="w-[140px]" />
      <div className="flex gap-4">
        <ChainButton />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
