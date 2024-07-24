import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";
import { LINKS } from "@/constants/common";

const ButtonTray = () => {
  return (
    <div className="flex gap-2">
      <Button className="font-bold">
        <Link href={LINKS.UNISWAP} target="_blank_">
          Buy on Uniswap
        </Link>
      </Button>
    </div>
  );
};

export default ButtonTray;
