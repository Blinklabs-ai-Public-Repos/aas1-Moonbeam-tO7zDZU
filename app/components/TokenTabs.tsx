import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenDetails from "../(tabs)/TokenDetails";
import Price from "../(tabs)/Price";
import SupplyDynamics from "../(tabs)/SupplyDynamics";
import Volume from "../(tabs)/Volume";
import HolderDistribution from "../(tabs)/HolderDistribution";

const TokenTabs = () => {
  const tabs = [
    { value: "details", label: "Token Details", component: <TokenDetails /> },
    { value: "price", label: "Price", component: <Price /> },
    { value: "volume", label: "Volume", component: <Volume /> },
    {
      value: "holder",
      label: "Holder Distribution",
      component: <HolderDistribution />,
    },
    {
      value: "supply",
      label: "Supply Dynamics",
      component: <SupplyDynamics />,
    },
  ];
  return (
    <Tabs
      defaultValue="details"
      className="w-full flex flex-col gap-2 items-center justify-center"
    >
      <TabsList className="grid w-fit grid-cols-5 text-neutral-400">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="font-bold">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TokenTabs;
