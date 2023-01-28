import { Exchanges } from "@utils/constants/exchanges";
import useMaxTrade from "./useMaxTrade";


const useAllMaxTrade = (tokenAddress: string, maxSlippage: number, exchanges:string[] = Object.values(Exchanges)) => {

  const fetchMaxTrade = {
    [Exchanges.UNISWAPV3LOW]: useMaxTrade(tokenAddress, Exchanges.UNISWAPV3LOW, maxSlippage),
    [Exchanges.UNISWAPV3MEDIUM]: useMaxTrade(tokenAddress, Exchanges.UNISWAPV3MEDIUM, maxSlippage),
    [Exchanges.UNISWAPV3HIGH]: useMaxTrade(tokenAddress, Exchanges.UNISWAPV3HIGH, maxSlippage),
    [Exchanges.UNISWAPV2]: useMaxTrade(tokenAddress, Exchanges.UNISWAPV2, maxSlippage),
  };

  let AllMaxTrade: any = {};
  Object.values(Exchanges).map((exchange) => {
    AllMaxTrade[exchange] = fetchMaxTrade[exchange].data;
  })

  return {
    data: AllMaxTrade,
  };
};

export default useAllMaxTrade;
