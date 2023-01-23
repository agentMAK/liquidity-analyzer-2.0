import { BigNumber, ethers } from "ethers";

export const mulBigNumbers = (
  a: BigNumber = BigNumber.from(0),
  b: BigNumber = BigNumber.from(0)
): BigNumber => {
  if (a == null || a.isZero() || b == null || b.isZero()) {
    return BigNumber.from(0);
  }

  const aFloat = parseFloat(ethers.utils.formatEther(a));
  const bFloat = parseFloat(ethers.utils.formatEther(b));

  if (isNaN(aFloat) || isNaN(bFloat)) {
    return BigNumber.from(0);
  }

  const resultFloat = aFloat * bFloat;

  return ethers.utils.parseEther(resultFloat.toFixed(18));
};
