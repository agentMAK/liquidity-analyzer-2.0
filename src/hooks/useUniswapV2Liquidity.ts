
import { useBalance, useContractRead } from "wagmi";
import { NULL_ADDRESS, WETH } from "@constants/tokens";
import V2_FACTORY_ABI from '@uniswap/v2-core/build/UniswapV2Factory.json'
import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from "@uniswap/v2-sdk";


const useUniswapV2Liquidity = (tokenAddress: `0x${string}`,) => {

  const poolAddress = useContractRead({
    address:V2_FACTORY_ADDRESS,
    abi: V2_FACTORY_ABI.abi,
    functionName: 'getPair',
    args:[tokenAddress,WETH]
  })

  const tokenBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: tokenAddress,
    enabled:poolAddress.isFetched
  });

  const wethBalance = useBalance({
    address: poolAddress.data as `0x${string}`,
    token: WETH,
    enabled:poolAddress.isFetched 
  });

  return {
    data: {
      isTokenPair: poolAddress.data !== NULL_ADDRESS,
      pairAddress: poolAddress.data,
      tokenBalance: tokenBalance.data?.value,
      wethBalance: wethBalance.data?.value,
    },
    isError: tokenBalance.isError || wethBalance.isError,
    isLoading: tokenBalance.isLoading && wethBalance.isLoading,
  };

};

export default useUniswapV2Liquidity;