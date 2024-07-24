import React from "react";

import RichText from "@/components/RichText";

import config from "@/uiconfig.json";

const TokenDetails = () => {
  const { tokenDetails } = config.project;
  return (
    <div className="flex flex-col gap-4 p-4">
      <RichText content={tokenDetails} />
    </div>
  );
};

export default TokenDetails;
