import { useQuery } from "react-query";
import { Exchanges, FLAGGEDPOOLS } from "@utils/constants/exchanges";
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
import { useProvider } from "wagmi";
import { FeeAmount } from "@uniswap/v3-sdk";
import { BigNumber } from "ethers";

const wrappedProviderExchanges = [
  Exchanges.UNISWAPV3LOW,
  Exchanges.UNISWAPV3MEDIUM,
  Exchanges.UNISWAPV3HIGH,
  "Sushiswap",
];

const checkPool = (tokenAddress: string, exchange: Exchanges) => {
  const pool = FLAGGEDPOOLS.find(
    (pool) => pool.tokenAddress === tokenAddress && pool.exchange === exchange
  );
  return pool ? true : false;
};

const useMaxTrade = (
  tokenAddress: string,
  exchange: Exchanges,
  maxSlippage: number,
  disabled: boolean = false
) => {
  let provider = useProvider();
  if (wrappedProviderExchanges.includes(exchange)) {
    provider = new DeployHelper(provider);
  }

  const result = useQuery(
    ["getMaxTrade", tokenAddress, exchange, maxSlippage],
    async () => {
      if (checkPool(tokenAddress, exchange)) return BigNumber.from("0");
      if (disabled) return BigNumber.from("0");
      let data;
      switch (exchange) {
        case Exchanges.UNISWAPV3LOW:
          data = await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.LOW
          );
          break;
        case Exchanges.UNISWAPV3MEDIUM:
          data = await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.MEDIUM
          );
          break;
        case Exchanges.UNISWAPV3HIGH:
          data = await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.HIGH
          );
          break;
        case Exchanges.UNISWAPV2:
          data = await getUniswapV2Quote(
            provider,
            tokenAddress,
            ether(maxSlippage)
          );
          break;
        case Exchanges.SUSHIWAP:
          data = await getSushiswapQuote(
            provider,
            tokenAddress,
            ether(maxSlippage)
          );
          break;
      }
      return BigNumber.from(data?.size || "0");
    }
  );
  result.isError ? (result.data = BigNumber.from("0")) : null;
  return result;
};

export default useMaxTrade;
