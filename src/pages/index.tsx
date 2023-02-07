import {
  Box,
  Flex,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import SlippageMessage from "@components/SlippageMessage";
import TokenDropBox from "@components/TokenDropBox";
import TokenLiquidityContainer from "@containers/TokenLiquidity";
import useKyberClassicLiquidity from "@hooks/Liquidity/useKyberClassicLiquidity";
import useKyberLiquidity from "@hooks/Liquidity/useKyberLiquidity";
import useAllMaxTradeNew from "@hooks/useAllMaxTrades";
import useUniswapTokenList from "@hooks/useUniswapTokenList";
import {
  DEFUALT_TOKEN,
  Token,
} from "@utils/constants/tokens";
import { trimAddress } from "@utils/formatting";
import { useState } from "react";

function Index(): JSX.Element {
  const [token, setToken] = useState<Token>(DEFUALT_TOKEN);
  const uniswapTokenList = useUniswapTokenList();
  const [value, setValue] = useState("0.5");

  return (
    <Box maxWidth={["1200px"]} margin={"auto"} px={"25px"}>
      <Box
        bgColor={"primary.75"}
        borderRadius="20px"
        mt="20px"
        padding={"30px"}
        color={"white"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading fontSize={"32px"} fontWeight={"500"}>
            Token Liquidity
          </Heading>
          <Box textAlign={"right"}>
            <Heading fontSize={"24px"} fontWeight={"500"}>
              {token.name}
            </Heading>
            <Link
              color={"primary.80"}
              fontSize={"12px"}
              textDecoration={"underline"}
              href={`https://etherscan.io/address/${token.address}`}
            >
              {trimAddress(token.address)}
            </Link>
          </Box>
        </Flex>
        <Text fontSize={"14px"} maxWidth={"400px"} mt="10px" mb={"29px"}>
          The token liquidity dashboard provides data on the liquidity of tokens
          on popular DeXs. This dashboard uses live on chain data to produce
          results.
        </Text>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <TokenDropBox
            tokenList={uniswapTokenList.isLoading ? [] : uniswapTokenList.data}
            setToken={setToken}
          />
          <Box>
            <SlippageMessage />
            <NumberInput
              size="lg"
              maxW={32}
              defaultValue={0.5}
              step={0.5}
              onChange={(valueString) => setValue(valueString.replace("%",''))}
              value={value+"%"}
              min={0.1}
              max={20}
              precision={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color={"white"} />
                <NumberDecrementStepper color={"white"} />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
      </Box>
      <TokenLiquidityContainer token={token} slippage={parseFloat(value)} />
    </Box>
  );
}

export default Index;
