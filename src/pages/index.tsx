import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import TokenDropBox from "@components/TokenDropBox";
import TokenLiquidityContainer from "@containers/TokenLiquidity";
import { TOKENLIQUIDITYLIST } from "@utils/constants/tokens";
import { trimAddress } from "@utils/formatting";
import { useState } from "react";

function Index(): JSX.Element {

  const [token, setToken] = useState<string>("DPI")

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
          <Box>
            <Heading fontSize={"24px"} fontWeight={"500"} textAlign={"right"}>
              {TOKENLIQUIDITYLIST[token as keyof typeof TOKENLIQUIDITYLIST].symbol}
            </Heading>
            <Link
              color={"primary.80"}
              fontSize={"12px"}
              textDecoration={"underline"}
            >
             {trimAddress(TOKENLIQUIDITYLIST[token as keyof typeof TOKENLIQUIDITYLIST].address)}
            </Link>
          </Box>
        </Flex>
        <Text fontSize={"14px"} maxWidth={"400px"} mt="10px" mb={'29px'}>
          The token liquidity dashboard provides data on the liquidity of tokens
          on popular DeXs. This dashboard uses live on chain data to produce
          results.
        </Text>
          <TokenDropBox setToken={setToken}/>
      </Box>
      <TokenLiquidityContainer tokenAddress={TOKENLIQUIDITYLIST[token as keyof typeof TOKENLIQUIDITYLIST].address as `0x${string}`} />
    </Box>
  );
}

export default Index;