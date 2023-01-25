import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import TokenDropBox from "@components/TokenDropBox";
import TokenLiquidityContainer from "@containers/TokenLiquidity";

function Index(): JSX.Element {

  return (
    <Box maxWidth={["1100px"]} margin={"auto"} px={"25px"}>
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
              DPI
            </Heading>
            <Link
              color={"primary.80"}
              fontSize={"12px"}
              textDecoration={"underline"}
            >
              0192739c...
            </Link>
          </Box>
        </Flex>
        <Text fontSize={"14px"} maxWidth={"400px"} mt="10px">
          The token liquidity dashboard provides data on the liquidity of tokens
          on popular DeXs. This dashboard uses live on chain data to produce
          results.
        </Text>
          <TokenDropBox />
      </Box>
      <TokenLiquidityContainer tokenAddress={"0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b"} />
    </Box>
  );
}

export default Index;
