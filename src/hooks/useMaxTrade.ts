import { useQuery } from "react-query";
import { Exchanges } from "@utils/constants/exchanges";
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

const wrappedProviderExchanges = [
  Exchanges.UNISWAPV3LOW,
  Exchanges.UNISWAPV3MEDIUM,
  Exchanges.UNISWAPV3HIGH,
  "Sushiswap",
];

const useMaxTrade = (
  tokenAddress: string,
  exchange: Exchanges,
  maxSlippage: number,
) => {

    let provider = useProvider();
  if (wrappedProviderExchanges.includes(exchange)) {
    provider = new DeployHelper(provider);
  }


  const result = useQuery(
    ["getMaxTrade", tokenAddress, exchange, maxSlippage],
    async () => {
      switch (exchange) {
        case Exchanges.UNISWAPV3LOW:
          return await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.LOW
          );
        case Exchanges.UNISWAPV3MEDIUM:
          return await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.MEDIUM
          );
        case Exchanges.UNISWAPV3HIGH:
          return await getUniswapV3Quote(
            provider,
            tokenAddress,
            ether(maxSlippage),
            FeeAmount.HIGH
          );
        case Exchanges.UNISWAPV2:
          return await getUniswapV2Quote(
            provider,
            tokenAddress,
            ether(maxSlippage)
          );
      }
    }
  );

  return result;
};

export default useMaxTrade;