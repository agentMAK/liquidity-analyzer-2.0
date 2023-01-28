import { Flex, Text } from "@chakra-ui/react";
import FeeTierIcon from "@components/FeeTierIcon";


export enum Exchanges {
  UNISWAPV3LOW = "Uniswap V3 (0.05%)",
  UNISWAPV3MEDIUM = "Uniswap V3 (0.3%)",
  UNISWAPV3HIGH = "Uniswap V3 (1%)",
  UNISWAPV2 = "Uniswap V2",
}


export const DisplayExchange = {
  [Exchanges.UNISWAPV3LOW]: 
    <Flex alignItems={"center"}>
      Uniswap V3
      <FeeTierIcon>0.05%</FeeTierIcon>
    </Flex>
  ,
  [Exchanges.UNISWAPV3MEDIUM]: <Flex alignItems={"center"}>
  Uniswap V3
  <FeeTierIcon>0.3%</FeeTierIcon>
</Flex>,
  [Exchanges.UNISWAPV3HIGH]: <Flex alignItems={"center"}>
  Uniswap V3
  <FeeTierIcon>1%</FeeTierIcon>
</Flex>,
[Exchanges.UNISWAPV2]:"Uniswap V2"
};

export const FLAGGEDPOOLS = [{tokenAddress:'0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b', exchange:Exchanges.UNISWAPV3HIGH}]