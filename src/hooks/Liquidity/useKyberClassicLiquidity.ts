import { useBalance, useContractRead, useContractReads } from "wagmi";
import { NULL_ADDRESS, Token, WETH } from "@constants/tokens";
import { erc20ABI } from "wagmi";

import { MINIMUM_LIQUIDITY } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";
import { KYBER_ELASTIC_FACTORY, KYBER_FACTORY } from "@utils/contracts/addresses";
import { KYBER_ELASTIC_FACTORY_ABI, KYBER_FACTORY_ABI } from "@utils/contracts/abis";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { formatToken } from "@utils/formatting";

const useKyberClassicLiquidity = (token: Token) => {

  const poolAddresses = useContractRead({
        address: KYBER_FACTORY,
        abi: KYBER_FACTORY_ABI,
        functionName: "getPools",
        args: [token.address, WETH],
      }
  );


  const tokenBalances = useContractReads({
    contracts: (poolAddresses.data as unknown as string[] || []).map((poolAddress) => ({
      address: token.address as `0x${string}`,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [poolAddress as unknown as `0x${string}`],
      enabled: poolAddresses.isFetched,
    })),
  });

  const bestLiquidityIndex = tokenBalances.data?.reduce(
    (liquidityMaxIndex, currentLiquidity, currentIndex, balances) =>
      (balances[liquidityMaxIndex as number] as unknown as BigNumber).gt(
        currentLiquidity as unknown as BigNumber
      )
        ? liquidityMaxIndex
        : currentIndex,
    0
  );

  const poolAddress = poolAddresses ? (poolAddresses.data as string[] || [])[bestLiquidityIndex as number] : NULL_ADDRESS;
  const tokenBalance = poolAddresses ? tokenBalances.data && tokenBalances.data[bestLiquidityIndex as number] : BigNumber.from(0);

  const wethBalance = useBalance({
    address: poolAddress as `0x${string}`,
    token: WETH,
    enabled: poolAddresses.isFetched,
  });

  const formattedTokenBalance = formatToken(tokenBalance as BigNumber, token.decimals)

  return {
    data: {
      isTokenPair: ((formattedTokenBalance || BigNumber.from(0)) as BigNumber).gt(MINIMUM_LIQUIDITY),
      pairAddress: poolAddress,
      tokenBalance: formattedTokenBalance,
      wethBalance: wethBalance.data?.value,
    },
    isError: poolAddresses.isError || wethBalance.isError,
    isLoading: poolAddresses.isLoading && wethBalance.isLoading,
  };

};

export default useKyberClassicLiquidity;
