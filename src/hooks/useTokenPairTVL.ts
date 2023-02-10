import { FeeAmount } from "@uniswap/v3-sdk";
import { mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";
import { Token, WETH } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import useUniswapV2Liquidity from "./Liquidity/useUniswapV2Liquidity";
import useUniswapV3Liquidity from "./Liquidity/useUniswapV3Liquidity";
import useSushiswapLiquidity from "./Liquidity/useSushiswapLiquidity";
import useKyberClassicLiquidity from "./Liquidity/useKyberClassicLiquidity";
import useCoinGeckoPrices from "./CoinGecko/useCoinGeckoPrices";

const useTokenPairTVL = (token:Token) => {
  const coinGeckoWETHTokenPrice = useCoinGeckoPrices([token.address,WETH]);

  const fetchLiquidity: any = {
    [Exchanges.UNISWAPV3LOW]: useUniswapV3Liquidity(
      token,
      FeeAmount.LOW
    ),
    [Exchanges.UNISWAPV3MEDIUM]: useUniswapV3Liquidity(
      token,
      FeeAmount.MEDIUM
    ),
    [Exchanges.UNISWAPV3HIGH]: useUniswapV3Liquidity(
      token,
      FeeAmount.HIGH
    ),
    [Exchanges.UNISWAPV2]: useUniswapV2Liquidity(token),
    [Exchanges.SUSHIWAP]: useSushiswapLiquidity(token),
    [Exchanges.KYBERCLASSIC]: useKyberClassicLiquidity(token),
  };

  const calculateTVL = (tokenBalance: BigNumber, wethBalance: BigNumber) => {
    if (tokenBalance === undefined || tokenBalance.isZero())
      return BigNumber.from("0");

    const tokenTVL = mulBigNumbers(tokenBalance, coinGeckoWETHTokenPrice.isFetched && !coinGeckoWETHTokenPrice.isError  ? coinGeckoWETHTokenPrice.data[token.address]: null);
    const wethTVL = mulBigNumbers(wethBalance, coinGeckoWETHTokenPrice.isFetched && !coinGeckoWETHTokenPrice.isError ? coinGeckoWETHTokenPrice.data[WETH] : null);

    return tokenTVL.add(wethTVL);
  };

  let tokenPairTVLs: any = {};

  Object.values(Exchanges).map((exchange) => {
      tokenPairTVLs[exchange] = {
        tvl: calculateTVL(
          fetchLiquidity[exchange].data.tokenBalance,
          fetchLiquidity[exchange].data.wethBalance
        ),
        isTokenPair:fetchLiquidity[exchange].data?.isTokenPair,
        exchange:exchange,
    }
  });

  return {
    data: tokenPairTVLs,
    isError:
      coinGeckoWETHTokenPrice.isError ||
      !Object.values(fetchLiquidity).every(
        (exchange: any) => !exchange.isError
      ),
    isLoading:
      coinGeckoWETHTokenPrice.isLoading ||
      !Object.values(fetchLiquidity).every(
        (exchange: any) => !exchange.isLoading
      ),
  };
};

export default useTokenPairTVL;
