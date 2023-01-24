import { mulBigNumbers } from "@utils/bigNumbers";
import { WETH } from "@utils/constants/tokens";
import useCoinGeckoPrice from "./useCoinGeckoPrice";
import useUniswapV3Liquidity from "./useUniswapV3Liquidity";


const useTokenPoolLiquidity = (tokenAddress:`0x${string}`) => {

    const uniswapV3Liquidity = useUniswapV3Liquidity(
        tokenAddress
      );
      const coinGeckoTokenPrice = useCoinGeckoPrice(
        tokenAddress
      );
      const coinGeckoEthPrice = useCoinGeckoPrice(
        WETH
      );
    
      const tokenLiquidty = mulBigNumbers(uniswapV3Liquidity.data.tokenBalance,coinGeckoTokenPrice.data)
      const ethLiquidty = mulBigNumbers(uniswapV3Liquidity.data.wethBalance,coinGeckoEthPrice.data)
      const poolLiquidity = tokenLiquidty.add(ethLiquidty)

    return {
        data: poolLiquidity,
        isError: uniswapV3Liquidity.isError || coinGeckoTokenPrice.isError || coinGeckoEthPrice .isError,
        isLoading: uniswapV3Liquidity.isLoading || coinGeckoTokenPrice.isLoading || coinGeckoEthPrice .isLoading,
      }
  };
  
  export default useTokenPoolLiquidity;
  