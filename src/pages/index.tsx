import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import TokenDropBox from "@components/TokenDropBox";
import TokenLiquidityContainer from "@containers/TokenLiquidity";
import { TOKEN_LIQUIDITY_LIST } from "@utils/constants/tokens";
import { trimAddress } from "@utils/formatting";
import { useState } from "react";

function Index(): JSX.Element {
  const [token, setToken] = useState<string>("DPI");
  const [tokenChosen, setTokenChosen] = useState<boolean>(false);
  const liquidityToken = TOKEN_LIQUIDITY_LIST[token as keyof typeof TOKEN_LIQUIDITY_LIST]

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
          <Box hidden={!tokenChosen}>
            <Heading fontSize={"24px"} fontWeight={"500"} textAlign={"right"}>
              {
                liquidityToken.symbol
              }
            </Heading>
            <Link
              color={"primary.80"}
              fontSize={"12px"}
              textDecoration={"underline"}
              href={`https://etherscan.io/address/${liquidityToken.address}`}
                      >
              {trimAddress(
                liquidityToken
                  .address
              )}
            </Link>
          </Box>
        </Flex>
        <Text fontSize={"14px"} maxWidth={"400px"} mt="10px" mb={"29px"}>
          The token liquidity dashboard provides data on the liquidity of tokens
          on popular DeXs. This dashboard uses live on chain data to produce
          results.
        </Text>
        <TokenDropBox
          setToken={setToken}
          tokenKey={token}
          tokenList={TOKEN_LIQUIDITY_LIST}
          tokenChosen={tokenChosen}
          setTokenChosen={setTokenChosen}
        />
      </Box>
      <TokenLiquidityContainer
        tokenAddress={
          TOKEN_LIQUIDITY_LIST[token as keyof typeof TOKEN_LIQUIDITY_LIST]
            .address as `0x${string}`
        }
        tokenChosen={tokenChosen}
      />
    </Box>
  );
}

export default Index;
