import { Box, Skeleton, Td } from "@chakra-ui/react";
import { Thead, Tbody, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useSushiswapLiquidity from "@hooks/Liquidity/useSushiswapLiquidity";
import useTokenPairTVL from "@hooks/useTokenPairTVL";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import MaxTradeTable from "./components/MaxTradeTable";
import MaxTradeTableBlank from "./components/MaxTradeTableBlank";
import TVLTableRow from "./components/TVLTableRow";

type TokenLiquidityContainerProps = {
  tokenAddress: `0x${string}`;
  tokenChosen: boolean;
};

const TokenLiquidityContainer = ({
  tokenAddress,
  tokenChosen,
}: TokenLiquidityContainerProps): JSX.Element => {
  const tokenTVL: any = useTokenPairTVL(tokenAddress);


  return (
    <Box mt={"20px"} mb={"50px"} width={"100%"} display={"flex"} gap={"12px"}>
      <Box
        border={"1px solid #B9B6FC"}
        height={"500px"}
        borderRadius={"20px"}
        width={"65%"}
      >
        <DataTable>
          <Thead>
            <Tr>
              <DTh>Exchange</DTh>
              <DTh>Total Value Locked</DTh>
            </Tr>
          </Thead>
          <Tbody>
            {!tokenChosen ? (
                Object.values(Exchanges).map((exchangeKey, index) => {
                  return (
                    <Tr key={index}>
                      <DTd>{DisplayExchange[exchangeKey]}</DTd>
                      <DTd />
                    </Tr>
                  );
                })
            ) : (
              Object.values(Exchanges).map((exchange, index) => {
                if (tokenTVL.data[exchange])
                  return (
                    <TVLTableRow
                      key={index}
                      exchange={exchange}
                      tvl={tokenTVL.data[exchange].tvl}
                      isLoading={tokenTVL.isLoading}
                      isError={tokenTVL.isError}
                    />
                  );
              })
            )}
          </Tbody>
        </DataTable>
      </Box>
      {!tokenChosen ? (
        <MaxTradeTableBlank />
      ) : tokenTVL.isLoading ? (
        <MaxTradeTableBlank isLoading={true} />
      ) : (
        <MaxTradeTable
          tokenAddress={tokenAddress}
          exchanges={Object.keys(tokenTVL.data)}
        />
      )}
    </Box>
  );
};

export default TokenLiquidityContainer;
