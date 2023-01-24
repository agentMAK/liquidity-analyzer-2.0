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

export const bigNumberToDecimal = (
  value: BigNumber,
  precison: number = 0
):string => {
  const bigNumberValue = BigNumber.from(value);
  const remainder = bigNumberValue.mod(1e8);
  const formattedValue = parseFloat(
    ethers.utils.formatUnits(bigNumberValue.sub(remainder))
  );

  return formattedValue.toFixed(precison);
};

function formatNumberWithCommas(x:string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatCurrency = (value:BigNumber) => {
  return formatNumberWithCommas(bigNumberToDecimal(value,2))
}