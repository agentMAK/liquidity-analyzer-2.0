import { Box, Skeleton, Td } from "@chakra-ui/react";
import { Thead, Tbody, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useTokenPairTVL from "@hooks/useTokenPairTVL";
import { Exchanges } from "@utils/constants/exchanges";
import { Token } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
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
  const sortedExchanges = tokenTVL.isLoading ?  Object.values(Exchanges) : Object.values(tokenTVL.data).sort((a:any, b:any) => {return b.tvl.gt(a.tvl) ? 1 : -1})


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
              {sortedExchanges.map((exchange:any, index) => {
                    return (
                      <TVLTableRow
                        key={index}
                        exchange={exchange.exchange}
                        tvl={exchange.tvl}
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
          token={token}
          exchanges={sortedExchanges.map((exchange:any) => {return exchange.exchange})}
          slippage={slippage}
        />
      )}
    </Box>
  );
};

export default TokenLiquidityContainer;
