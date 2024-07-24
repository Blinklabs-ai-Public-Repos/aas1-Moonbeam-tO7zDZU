"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const TokenInfoLoading = () => {
  return (
    <div className="flex flex-col gap-3 justify-between font-bold">
      <div className="w-full flex justify-between items-center">
        <p>Token Name</p>
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Ticker</p>
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Token Supply</p>
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Creator Address</p>
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Contract Address</p>
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default TokenInfoLoading;
