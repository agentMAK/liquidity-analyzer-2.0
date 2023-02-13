import { Flex, Text } from "@chakra-ui/react";
import FeeTierIcon from "@components/FeeTierIcon";
import { parseUnits } from "ethers/lib/utils.js";

export enum Exchanges {
  UNISWAPV3LOWEST = "Uniswap V3 (0.01%)",
  UNISWAPV3LOW = "Uniswap V3 (0.05%)",
  UNISWAPV3MEDIUM = "Uniswap V3 (0.3%)",
  UNISWAPV3HIGH = "Uniswap V3 (1%)",
  UNISWAPV2 = "Uniswap V2",
  SUSHIWAP = "Sushiswap",
  KYBERCLASSIC = 'Kyber',
  BALANCERV1 = 'Balancer V1',
}

export const DisplayExchange = {
  [Exchanges.UNISWAPV3LOW]: (
    <Flex alignItems={"center"}>
      Uniswap V3
      <FeeTierIcon>0.05%</FeeTierIcon>
    </Flex>
  ),
  [Exchanges.UNISWAPV3MEDIUM]: (
    <Flex alignItems={"center"}>
      Uniswap V3
      <FeeTierIcon>0.3%</FeeTierIcon>
    </Flex>
  ),
  [Exchanges.UNISWAPV3HIGH]: (
    <Flex alignItems={"center"}>
      Uniswap V3
      <FeeTierIcon>1%</FeeTierIcon>
    </Flex>
  ),
  [Exchanges.UNISWAPV3LOWEST]: (
    <Flex alignItems={"center"}>
      Uniswap V3
      <FeeTierIcon>0.01%</FeeTierIcon>
    </Flex>
  ),
  [Exchanges.UNISWAPV2]: "Uniswap V2",
  [Exchanges.SUSHIWAP]: "Sushiswap",
  [Exchanges.KYBERCLASSIC]: (
    <Flex alignItems={"center"}>
      Kyber
      <FeeTierIcon>Classic</FeeTierIcon>
    </Flex>
  ),
  [Exchanges.BALANCERV1]: (
    <Flex alignItems={"center"}>
      Balancer
      <FeeTierIcon>V1</FeeTierIcon>
    </Flex>
  )
};

export const FLAGGEDPOOLS = [
  {
    tokenAddress: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    exchange: Exchanges.UNISWAPV3HIGH,
  },
];

export const MINIMUM_LIQUIDITY = parseUnits("10");