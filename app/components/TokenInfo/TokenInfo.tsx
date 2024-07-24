"use client";

import BigNumber from "bignumber.js";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import useToken from "@/hooks/token/useToken";
import { copyToClipboard, formatBigNumber, shortenAddress } from "@/lib/utils";
import config from "@/uiconfig.json";

import TokenInfoLoading from "./TokenInfoLoading";
import { CHAINS } from "@/constants/chains";

const TokenInfo = () => {
  const { contractAddress, chainId } = config;
  const chainInfo = CHAINS[chainId as keyof typeof CHAINS];
  const { loading, tokenSupply, name, symbol, decimals } = useToken();

  if (loading) {
    return <TokenInfoLoading />;
  }

  const infoItems = [
    { label: "Token Name", value: name },
    { label: "Ticker", value: symbol },
    {
      label: "Token Supply",
      value: formatBigNumber(
        BigNumber(tokenSupply)
          .dividedBy(BigNumber(10).exponentiatedBy(decimals))
          .toString(10)
      ),
    },
    { label: "Creator Address", value: config.owner, isAddress: true },
    { label: "Contract Address", value: contractAddress, isAddress: true },
  ];

  return (
    <div className="flex flex-col gap-3 justify-between font-bold text-sm sm:text-base">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col sm:flex-row sm:justify-between"
        >
          <p className="mb-1 sm:mb-0">{item.label}</p>
          {item.isAddress ? (
            <div className="flex items-center gap-1">
              <Link
                href={
                  chainInfo.id === 31337
                    ? ""
                    : `${chainInfo.explorer}/address/${item.value}`
                }
                target="_blank"
                className={clsx(
                  "underline break-all",
                  chainInfo.id !== 31337 && "text-blue-400"
                )}
              >
                {shortenAddress(item.value)}
              </Link>
              <Image
                src="/icons/copy.svg"
                height={14}
                width={14}
                alt="copy"
                className="cursor-pointer flex-shrink-0"
                onClick={() => copyToClipboard(item.value)}
              />
            </div>
          ) : (
            <p className="text-neutral-400 break-all">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TokenInfo;
