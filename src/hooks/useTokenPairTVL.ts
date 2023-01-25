import { FeeAmount } from "@uniswap/v3-sdk";
import { mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";
import { WETH } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import useCoinGeckoPrice from "./useCoinGeckoPrice";
import useUniswapV3Liquidity from "./useUniswapV3Liquidity";

const useTokenPairTVL = (tokenAddress: `0x${string}`) => {
  const coinGeckoTokenPrice = useCoinGeckoPrice(tokenAddress);
  const coinGeckoEthPrice = useCoinGeckoPrice(WETH);

  const fetchLiquidity: any = {
    [Exchanges.UNISWAPV3LOW]: useUniswapV3Liquidity(
      tokenAddress,
      FeeAmount.LOW
    ),
    [Exchanges.UNISWAPV3MEDIUM]: useUniswapV3Liquidity(
      tokenAddress,
      FeeAmount.MEDIUM
    ),
    [Exchanges.UNISWAPV3HIGH]: useUniswapV3Liquidity(
      tokenAddress,
      FeeAmount.HIGH
    ),
  };

  const calculateTVL = (tokenBalance: BigNumber, wethBalance: BigNumber) => {

    if(tokenBalance.isZero())
      return BigNumber.from("0")

    const tokenTVL = mulBigNumbers(tokenBalance, coinGeckoTokenPrice.data);
    const wethTVL = mulBigNumbers(wethBalance, coinGeckoEthPrice.data);

    return tokenTVL.add(wethTVL);
  };

  let tokenPairTVLs: any = {};

  Object.values(Exchanges).map((exchange) => {
    tokenPairTVLs[exchange] = calculateTVL(
      fetchLiquidity[exchange].data.tokenBalance,
      fetchLiquidity[exchange].data.wethBalance
    );
  });

  return {
    data: tokenPairTVLs,
    isError: coinGeckoTokenPrice.isError || coinGeckoEthPrice.isError || !Object.values(fetchLiquidity).every((exchange:any) => !exchange.isError),
    isLoading: coinGeckoTokenPrice.isLoading || coinGeckoEthPrice.isLoading || !Object.values(fetchLiquidity).every((exchange:any) => !exchange.isLoading),
  };
};

export default useTokenPairTVL;
