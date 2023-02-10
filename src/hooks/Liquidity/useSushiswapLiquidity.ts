import { useBalance, useContractRead } from "wagmi";
import { NULL_ADDRESS, Token, WETH } from "@constants/tokens";
import V2_FACTORY_ABI from "@uniswap/v2-core/build/UniswapV2Factory.json";
import {
  MINIMUM_LIQUIDITY,
} from "@utils/constants/exchanges";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { BigNumber } from "ethers";
import { SUSHI_FACTORY_ADDRESS } from "@utils/contracts/addresses";
import { formatToken } from "@utils/formatting";

const useSushiswapLiquidity = (token:Token) => {
  const poolAddress = useContractRead({
    address: SUSHI_FACTORY_ADDRESS,
    abi: V2_FACTORY_ABI.abi,
    functionName: "getPair",
    args: [token.address, WETH],
  });

  const tokenBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: token.address as `0x${string}`,
    enabled: poolAddress.isFetched || !poolAddress.isError,
  });

  const wethBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: WETH,
    enabled: poolAddress.isFetched || !poolAddress.isError,
  });

  const formattedTokenBalance = formatToken(tokenBalance.data?.value, token.decimals)

  return {
    data: {
      isTokenPair:
      (formattedTokenBalance || BigNumber.from(0)).gt(MINIMUM_LIQUIDITY) &&
        poolAddress.data !== NULL_ADDRESS,
      pairAddress: poolAddress.data,
      tokenBalance: formattedTokenBalance,
      wethBalance: wethBalance.data?.value,
    },
    isError: tokenBalance.isError || wethBalance.isError,
    isLoading: tokenBalance.isLoading && wethBalance.isLoading,
  };
};

export default useSushiswapLiquidity;
