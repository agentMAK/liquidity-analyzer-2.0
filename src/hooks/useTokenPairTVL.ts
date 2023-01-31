import { FeeAmount } from "@uniswap/v3-sdk";
import { mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";
import { WETH } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import useUniswapV2Liquidity from "./Liquidity/useUniswapV2Liquidity";
import useUniswapV3Liquidity from "./Liquidity/useUniswapV3Liquidity";
import useCoinGeckoPrice from "./CoinGecko/useCoinGeckoPrice";

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
    [Exchanges.UNISWAPV2]: useUniswapV2Liquidity(tokenAddress),
  };

  const calculateTVL = (tokenBalance: BigNumber, wethBalance: BigNumber) => {
    if (tokenBalance === undefined || tokenBalance.isZero())
      return BigNumber.from("0");

    const tokenTVL = mulBigNumbers(tokenBalance, coinGeckoTokenPrice.data);
    const wethTVL = mulBigNumbers(wethBalance, coinGeckoEthPrice.data);

    return tokenTVL.add(wethTVL);
  };

  let tokenPairTVLs: any = {};

  Object.values(Exchanges).map((exchange) => {
    if (fetchLiquidity[exchange].data?.isTokenPair) {
      tokenPairTVLs[exchange] = {
        tvl: calculateTVL(
          fetchLiquidity[exchange].data.tokenBalance,
          fetchLiquidity[exchange].data.wethBalance
        ),
      };
    }
  });

  return {
    data: tokenPairTVLs,
    isError:
      coinGeckoTokenPrice.isError ||
      coinGeckoEthPrice.isError ||
      !Object.values(fetchLiquidity).every(
        (exchange: any) => !exchange.isError
      ),
    isLoading:
      coinGeckoTokenPrice.isLoading ||
      coinGeckoEthPrice.isLoading ||
      !Object.values(fetchLiquidity).every(
        (exchange: any) => !exchange.isLoading
      ),
  };
};

export default useTokenPairTVL;
