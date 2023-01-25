import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS, FeeAmount} from "@uniswap/v3-sdk";
import { useBalance, useContractRead } from "wagmi";
import { NULL_ADDRESS, WETH } from "@constants/tokens";
import V3_FACTORY_ABI from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'


const useUniswapV3Liquidity = (tokenAddress: `0x${string}`,feeAmount:FeeAmount) => {

  const poolAddress = useContractRead({
    address:V3_FACTORY_ADDRESS,
    abi: V3_FACTORY_ABI.abi,
    functionName: 'getPool',
    args:[tokenAddress,WETH,feeAmount]
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

export default useUniswapV3Liquidity;