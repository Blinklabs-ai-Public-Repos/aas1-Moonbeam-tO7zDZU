import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: `0x${string}` | string) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const formatBigNumber = (
  value: undefined | string | number | bigint
) => {
  if (!value) return 0;
  return new Intl.NumberFormat("en-US").format(Number(value));
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
