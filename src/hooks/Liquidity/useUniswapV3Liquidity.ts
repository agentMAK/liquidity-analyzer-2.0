import {
  FACTORY_ADDRESS as V3_FACTORY_ADDRESS,
  FeeAmount,
} from "@uniswap/v3-sdk";
import { useBalance, useContractRead } from "wagmi";
import { NULL_ADDRESS, Token, WETH } from "@constants/tokens";
import V3_FACTORY_ABI from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import { MINIMUM_LIQUIDITY } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";

const useUniswapV3Liquidity = (
  token:Token,
  feeAmount: FeeAmount
) => {
  const poolAddress = useContractRead({
    address: V3_FACTORY_ADDRESS,
    abi: V3_FACTORY_ABI.abi,
    functionName: "getPool",
    args: [token.address, WETH, feeAmount],
  });

  const tokenBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: token.address  as `0x${string}`,
    enabled: poolAddress.isFetched,
  });

  const wethBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: WETH,
    enabled: poolAddress.isFetched,
  });
  
  const formattedTokenBalance =
    token.decimals === 18
      ? tokenBalance.data?.value
      : parseUnits(
          formatUnits(
            tokenBalance.data?.value || BigNumber.from(0),
            token.decimals
          )
        );


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

export default useUniswapV3Liquidity;
