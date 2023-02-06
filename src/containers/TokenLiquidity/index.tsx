import { Box, Skeleton, Td } from "@chakra-ui/react";
import { Thead, Tbody, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useTokenPairTVL from "@hooks/useTokenPairTVL";
import { Exchanges } from "@utils/constants/exchanges";
import { Token } from "@utils/constants/tokens";
import MaxTradeTable from "./components/MaxTradeTable";
import MaxTradeTableBlank from "./components/MaxTradeTableBlank";
import TVLTableRow from "./components/TVLTableRow";

type TokenLiquidityContainerProps = {
  token:Token;
  slippage:number;
};

const TokenLiquidityContainer = ({
  token,
  slippage
}: TokenLiquidityContainerProps): JSX.Element => {
  
  const tokenTVL: any = useTokenPairTVL(token);


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
              {Object.values(Exchanges).map((exchange, index) => {
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
                })}
          </Tbody>
        </DataTable>
      </Box>
      {tokenTVL.isLoading ? (
        <MaxTradeTableBlank isLoading={true} />
      ) : (
        <MaxTradeTable
          tokenAddress={token.address as `0x${string}`}
          exchanges={Object.keys(tokenTVL.data).map(exchangeValue => exchangeValue as Exchanges)}
          slippage={slippage}
        />
      )}
    </Box>
  );
};

export default TokenLiquidityContainer;
