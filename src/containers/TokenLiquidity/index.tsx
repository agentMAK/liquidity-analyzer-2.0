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

  const tokenTVLs: any = useTokenPairTVL(token);
  const sortedExchanges = tokenTVLs.isLoading ?  Object.values(Exchanges) : Object.values(tokenTVLs.data).sort((a:any, b:any) => {return b.tvl.gt(a.tvl) ? 1 : -1})


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
              {sortedExchanges.map((tokenTVL:any, index) => {
                    return (
                      <TVLTableRow
                        key={index}
                        exchange={tokenTVL.exchange}
                        tvl={tokenTVL.tvl}
                        address={tokenTVL.poolAddress}
                        isLoading={tokenTVLs.isLoading}
                        isError={tokenTVLs.isError}
                      />
                    );
                })}
          </Tbody>
        </DataTable>
      </Box>
      {tokenTVLs.isLoading ? (
        <MaxTradeTableBlank isLoading={true} />
      ) : (
        <MaxTradeTable
          token={token}
          exchanges={sortedExchanges.map((exchange:any) => {return exchange.exchange})}
          slippage={slippage}
        />
      )}
    </Box>
  );
};

export default TokenLiquidityContainer;
