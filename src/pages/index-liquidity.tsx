import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import TokenDropBox from "@components/TokenDropBox";
import IndexLiquidityContainer from "@containers/IndexLiquidity";
import useCoinGeckoMarketData from "@hooks/CoinGecko/useCoinGeckoMarketData";
import useCoinGeckoTotalMarketCap from "@hooks/CoinGecko/useCoinGeckoTotalMarketCap";
import useSetComponents, { TokenSet } from "@hooks/useSetComponents";
import { INDEX_TOKENS } from "@utils/constants/tokens";
import { ethers } from "ethers";
import { useState } from "react";

function IndexLiquidity(): JSX.Element {
  const [token, setToken] = useState<string>("DPI");
  const [tokenChosen, setTokenChosen] = useState<boolean>(false);
  const indexToken = INDEX_TOKENS[token as keyof typeof INDEX_TOKENS];

  const coinGeckoMarketData = useCoinGeckoMarketData([indexToken.coinGeckoId]);

  const tokenComponents = useSetComponents(
    indexToken.tokenSetId as TokenSet
  );

  const totalMarketCap = useCoinGeckoTotalMarketCap();

  const calculateNetAssetValue = (tokens: any) => {
    let total = 0;
    tokens.forEach((token: any) => {
      total += parseFloat(token.total_price_usd);
    });
    return total;
  };

  return (
    <Box maxWidth={["1200px"]} margin={"auto"} px={"25px"}>
      <Flex mt="20px" gap={"20px"}>
        <Box
          bgColor={"primary.75"}
          borderRadius="20px"
          padding={"30px"}
          color={"white"}
          width={"70%"}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading fontSize={"32px"} fontWeight={"500"}>
              Index Liquidity
            </Heading>
            <Box>
              <Checkbox fontWeight={"500"} fontSize={"12px"} disabled>
                SIMULATE REBALANCE
              </Checkbox>
            </Box>
          </Flex>
          <Text fontSize={"14px"} maxWidth={"400px"} mt="10px" mb={"29px"}>
            The Index liquidity dashboard displays liquidity for component
            tokens that make up Index&#39;s products. Dashboard can also
            simulate an rebalance.
          </Text>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <TokenDropBox
              setToken={setToken}
              tokenKey={token}
              tokenList={INDEX_TOKENS}
              tokenChosen={tokenChosen}
              setTokenChosen={setTokenChosen}
            />
            <Box>
              <Text fontSize={"12px"} fontWeight={"500"}>
                Gas Cost (Gwei)
              </Text>
              <NumberInput size="lg" maxW={32} defaultValue={15} isDisabled>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color={"white"} />
                  <NumberDecrementStepper color={"white"} />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
        </Box>
        <Box
          borderRadius={"20px"}
          border={"1px solid #000000"}
          width={"30%"}
          padding={"20px"}
        >
          <Text fontWeight={"500"} fontSize={"24px"}>
            Total Market Cap: <br />$
            <Skeleton as="span" isLoaded={!totalMarketCap.isLoading}>
              {!tokenChosen ? "" : totalMarketCap.isLoading
                ? "loading"
                : ethers.utils.commify(totalMarketCap.data)}
            </Skeleton>
          </Text>
          <Text mt={"33px"} fontSize={"14px"}>
            <Text as="span" fontWeight={"500"}>
              Market Cap:
            </Text>
            {" $"}
            <Skeleton as="span" isLoaded={!coinGeckoMarketData.isLoading}>
              {!tokenChosen ? "" : coinGeckoMarketData.isLoading
                ? "loading"
                : ethers.utils.commify(
                    coinGeckoMarketData.data[token].market_cap
                  )}
            </Skeleton>
            <Text as="span" fontWeight={"500"}>
              <br />
              Net Asset Value:
            </Text>
            {" $"}
            <Skeleton as="span" isLoaded={!tokenComponents.isLoading}>
              {!tokenChosen ? "" : tokenComponents.isLoading
                ? "loading"
                : ethers.utils.commify(
                    calculateNetAssetValue(tokenComponents.data).toFixed(2)
                  )}
            </Skeleton>
          </Text>
        </Box>
      </Flex>
      <IndexLiquidityContainer tokenComponents={tokenComponents} tokenChosen={tokenChosen} />
    </Box>
  );
}

export default IndexLiquidity;
