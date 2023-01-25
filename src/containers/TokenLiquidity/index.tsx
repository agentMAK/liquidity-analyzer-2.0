import { Box, Flex, Text, tokenToCSSVar } from "@chakra-ui/react";
import { Thead, Tbody, Tr } from "@chakra-ui/react";
import DataTable, { DTh } from "@components/DataTable";
import useTokenPairTVL from "@hooks/useTokenPairTVL";
import useUniswapV2Liquidity from "@hooks/useUniswapV2Liquidity";
import { Exchanges } from "@utils/constants/exchanges";
import TVLTableRow from "./components/TVLTableRow";

type TokenLiquidityContainerProps = {
  tokenAddress: `0x${string}`;
};

const TokenLiquidityContainer = ({
  tokenAddress,
}: TokenLiquidityContainerProps): JSX.Element => {
  const tokenTVL: any = useTokenPairTVL(tokenAddress);

  const data = useUniswapV2Liquidity(tokenAddress)
  console.log(data.data)


  return (
    <Box
      mt={"20px"}
      mb={"50px"}
      width={"100%"}
      border={"1px solid #B9B6FC"}
      height={"500px"}
      borderRadius={"20px"}
    >
      <DataTable>
        <Thead>
          <Tr>
            <DTh>Exchange</DTh>
            <DTh>Total Value Locked</DTh>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(Exchanges).map((exchange, index) => {
            if (!tokenTVL.data[exchange].isZero()) 
              return (
                <TVLTableRow
                  key={index}
                  exchange={exchange}
                  tvl ={tokenTVL.data[exchange]}
                  isLoading={tokenTVL.isLoading}
                  isError={tokenTVL.isError}
                />
              );
          })}
        </Tbody>
      </DataTable>
    </Box>
  );
};

export default TokenLiquidityContainer;
