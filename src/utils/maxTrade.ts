import { Exchanges, FLAGGEDPOOLS } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";
// @ts-ignore
import DeployHelper from "@indexcoop/index-rebalance-utils/dist/utils/deploys/index";
// @ts-ignore
import { ether } from "@indexcoop/index-coop-smart-contracts/dist/utils/common";

import {
  getUniswapV3Quote,
  getUniswapV2Quote,
  getSushiswapQuote,
  getKyberDMMQuote,
  getBalancerV1Quote,
  // @ts-ignore
} from "@indexcoop/index-rebalance-utils/dist/index-rebalances/utils/paramDetermination";
import { FeeAmount } from "@uniswap/v3-sdk";
import { getAddress } from "ethers/lib/utils.js";

const checkPool = (tokenAddress: string, exchange: Exchanges) => {
  const pool = FLAGGEDPOOLS.find(
    (pool) => pool.tokenAddress === tokenAddress && pool.exchange === exchange
  );
  return pool ? true : false;
};

const wrappedProviderExchanges = [
  Exchanges.UNISWAPV3LOW,
  Exchanges.UNISWAPV3MEDIUM,
  Exchanges.UNISWAPV3HIGH,
  "Sushiswap",
];

const fetchMaxTrade = async (
  tokenAddress: string,
  exchange: Exchanges,
  maxSlippage: number,
  provider: any
) => {
  if (checkPool(tokenAddress, exchange)) return BigNumber.from("0");

  if (wrappedProviderExchanges.includes(exchange)) {
    provider = new DeployHelper(provider);
  }

  let data;
  switch (exchange) {
    case Exchanges.UNISWAPV3LOWEST:
      data = await getUniswapV3Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage),
        FeeAmount.LOWEST
      );
      break;
    case Exchanges.UNISWAPV3LOW:
      data = await getUniswapV3Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage),
        FeeAmount.LOW
      );
      break;
    case Exchanges.UNISWAPV3MEDIUM:
      data = await getUniswapV3Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage),
        FeeAmount.MEDIUM
      );
      break;
    case Exchanges.UNISWAPV3HIGH:
      data = await getUniswapV3Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage),
        FeeAmount.HIGH
      );
      break;
    case Exchanges.UNISWAPV2:
      data = await getUniswapV2Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage)
      );
      break;
    case Exchanges.SUSHIWAP:
      data = await getSushiswapQuote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage)
      );
      break;
    case Exchanges.KYBERCLASSIC:
        data = await getKyberDMMQuote(
          provider,
          getAddress(tokenAddress),
          ether(maxSlippage)
        );
        break;
    case Exchanges.BALANCERV1:
      data = await getBalancerV1Quote(
        provider,
        getAddress(tokenAddress),
        ether(maxSlippage)
      );
      break;
  }
  return BigNumber.from(data?.size || "0");
};

export default fetchMaxTrade