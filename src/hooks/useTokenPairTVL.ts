import { FeeAmount } from "@uniswap/v3-sdk";
import { mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";
import { Token, WETH } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import useUniswapV2Liquidity from "./Liquidity/useUniswapV2Liquidity";
import useUniswapV3Liquidity from "./Liquidity/useUniswapV3Liquidity";
import useCoinGeckoPrice from "./CoinGecko/useCoinGeckoPrice";
import useSushiswapLiquidity from "./Liquidity/useSushiswapLiquidity";
import useKyberLiquidity from "./Liquidity/useKyberLiquidity";
import useKyberClassicLiquidity from "./Liquidity/useKyberClassicLiquidity";

const useTokenPairTVL = (token:Token) => {
  const coinGeckoTokenPrice = useCoinGeckoPrice(token.address);
  const coinGeckoEthPrice = useCoinGeckoPrice(WETH);

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
