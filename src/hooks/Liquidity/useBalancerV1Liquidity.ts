import { useBalance, useContractRead, useContractReads } from "wagmi";
import { NULL_ADDRESS, Token, WETH } from "@constants/tokens";
import { erc20ABI } from "wagmi";

import { MINIMUM_LIQUIDITY } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";

import { formatToken } from "@utils/formatting";
import { BALANCER_OCR } from "@utils/contracts/addresses";
import { BALANCER_OCR_ABI } from "@utils/contracts/abis";

const useBalancerV1Liquidity = (token: Token) => {

  const poolAddresses = useContractRead({
        address: BALANCER_OCR,
        abi: BALANCER_OCR_ABI,
        functionName: "getBestPools",
        args: [WETH, token.address],
      }
  );
  
  const tokenBalances = useContractReads({
    contracts: (poolAddresses.data as unknown as string[] || []).map((poolAddress) => ({
      address: token.address as `0x${string}`,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [poolAddress as unknown as `0x${string}`],
      enabled: poolAddresses.isFetched && !poolAddresses.isError,
    })),
  });

  const wethBalances = useContractReads({
    contracts: (poolAddresses.data as unknown as string[] || []).map((poolAddress) => ({
      address: WETH,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [poolAddress as unknown as `0x${string}`],
      enabled: poolAddresses.isFetched && !poolAddresses.isError,
    })),
  });


  const wethBalance = wethBalances.data ? wethBalances.data?.reduce((prev,curr) => (prev as unknown as BigNumber).add(curr as unknown as BigNumber),BigNumber.from(0)) : BigNumber.from(0)
  const tokenBalance = tokenBalances.data ? tokenBalances.data?.reduce((prev,curr) => (prev as unknown as BigNumber).add(curr as unknown as BigNumber),BigNumber.from(0)) : BigNumber.from(0)

   const formattedTokenBalance = formatToken(tokenBalance as BigNumber, token.decimals)

  return {
    data: {
      isTokenPair: ((formattedTokenBalance || BigNumber.from(0)) as BigNumber).gt(MINIMUM_LIQUIDITY),
      pairAddress: poolAddresses.data ? poolAddresses.data[0 as keyof typeof poolAddresses.data] : [],
      tokenBalance: formattedTokenBalance,
      wethBalance: wethBalance,
    },
    isError: poolAddresses.isError || wethBalances.isError || tokenBalances.isError,
    isLoading: poolAddresses.isLoading || wethBalances.isLoading || tokenBalances.isLoading,
  };

};

export default useBalancerV1Liquidity;
