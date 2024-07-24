import Image from "next/image";
import Link from "next/link";

import config from "@/uiconfig.json";

import ButtonTray from "./components/ButtonTray";
import TokenInfo from "./components/TokenInfo/TokenInfo";
import TokenTabs from "./components/TokenTabs";

const MintPage = () => {
  const { project } = config;
  const { name, description, logoUrl, bannerUrl, media } = project;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <div className="w-full h-[200px] sm:h-[360px] relative">
          <Image
            src={bannerUrl}
            alt="banner"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-full px-4 flex flex-col sm:flex-row items-center sm:items-end justify-between absolute -bottom-[50px]">
          <Image
            src={logoUrl}
            alt="logo"
            height={80}
            width={80}
            className="rounded-lg mb-2 sm:mb-0"
          />
          <div className="flex gap-2 mt-2 sm:mt-0">
            {Object.keys(media).map((key) => (
              <Link
                key={key}
                href={media[key as keyof typeof media] as string}
                target="_blank"
                className="bg-white rounded-full p-1 w-[27px] h-[27px] flex items-center justify-center"
              >
                <Image
                  src={`logos/${key}-icon.svg`}
                  alt={key}
                  width={16}
                  height={16}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-20 px-4 py-16 mt-[60px] sm:mt-0">
        <div className="sm:col-span-2 flex flex-col gap-3">
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-sm line-clamp-4">{description}</p>
          <ButtonTray />
        </div>
        <TokenInfo />
      </div>
      <TokenTabs />
    </div>
  );
};

export default MintPage;
