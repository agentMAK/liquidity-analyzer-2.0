import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { Token } from "./constants/tokens";

export function trimAddress(address: string, length = 12) {
  if (length >= address.length) {
    return address;
  }
  const baseLength = length - 5;
  const startNo = Math.round(baseLength / 2);
  const endNo = Math.floor(baseLength / 2);

  const prefix = address.substring(0, 2);
  const start = address.substring(2, startNo + 2);
  const end = address.substring(address.length, address.length - endNo);

  return prefix + start + "..." + end;
}

export const formatToken = (value:BigNumber = BigNumber.from(0),decimal:number) => {
  return decimal === 18
    ? value
    : parseUnits(
        formatUnits(
          value || BigNumber.from(0),
          decimal
        )
      );
}