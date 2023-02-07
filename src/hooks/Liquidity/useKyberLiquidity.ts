import { useBalance, useContractRead, useContractReads } from "wagmi";
import { NULL_ADDRESS, Token, WETH } from "@constants/tokens";
import { erc20ABI } from "wagmi";

import { MINIMUM_LIQUIDITY } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";
import { KYBER_ELASTIC_FACTORY } from "@utils/contracts/addresses";
import { KYBER_ELASTIC_FACTORY_ABI } from "@utils/contracts/abis";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { formatToken } from "@utils/formatting";

const useKyberLiquidity = (token: Token) => {
  const kyberElasticContract: { address: `0x${string}`; abi: any[] } = {
    address: KYBER_ELASTIC_FACTORY,
    abi: KYBER_ELASTIC_FACTORY_ABI,
  };

  const fetchPoolAddresses = useContractReads({
    contracts: [
      {
        ...kyberElasticContract,
        functionName: "getPool",
        args: [token.address, WETH, 8],
      },
      {
        ...kyberElasticContract,
        functionName: "getPool",
        args: [token.address, WETH, 10],
      },
      {
        ...kyberElasticContract,
        functionName: "getPool",
        args: [token.address, WETH, 40],
      },
      {
        ...kyberElasticContract,
        functionName: "getPool",
        args: [token.address, WETH, 300],
      },
      {
        ...kyberElasticContract,
        functionName: "getPool",
        args: [token.address, WETH, 1000],
      },
    ],
  });

  const poolAddresses =
    fetchPoolAddresses.data?.filter(
      (poolAddress) => (poolAddress as unknown as string) !== NULL_ADDRESS
    ) || [];

  const tokenBalances = useContractReads({
    contracts: poolAddresses.map((poolAddress) => ({
      address: token.address as `0x${string}`,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [poolAddress as unknown as `0x${string}`],
      enabled: fetchPoolAddresses.isFetched,
    })),
  });

  const bestLiquidityIndex: any = tokenBalances.data?.reduce(
    (liquidityMaxIndex, currentLiquidity, currentIndex, balances) =>
      (balances[liquidityMaxIndex as number] as unknown as BigNumber).gt(
        currentLiquidity as unknown as BigNumber
      )
        ? liquidityMaxIndex
        : currentIndex,
    0
  );

  const poolAddress = poolAddresses ? poolAddresses[bestLiquidityIndex] : NULL_ADDRESS;
  const tokenBalance = poolAddresses ? tokenBalances.data && tokenBalances.data[bestLiquidityIndex] : BigNumber.from(0);

  const wethBalance = useBalance({
    address: poolAddress as `0x${string}`,
    token: WETH,
    enabled: fetchPoolAddresses.isFetched,
  });

  const formattedTokenBalance = formatToken(tokenBalance as BigNumber, token.decimals)
  
  return {
    data: {
      isTokenPair: ((formattedTokenBalance || BigNumber.from(0)) as BigNumber).gt(MINIMUM_LIQUIDITY),
      pairAddress: poolAddress,
      tokenBalance: formattedTokenBalance,
      wethBalance: wethBalance.data?.value,
    },
    isError: fetchPoolAddresses.isError || wethBalance.isError,
    isLoading: fetchPoolAddresses.isLoading && wethBalance.isLoading,
  };

};

export default useKyberLiquidity;
