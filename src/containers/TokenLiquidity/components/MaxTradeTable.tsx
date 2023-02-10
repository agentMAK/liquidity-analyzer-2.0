import { Box, Tbody, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useCoinGeckoPrices from "@hooks/CoinGecko/useCoinGeckoPrices";
import useAllMaxTrade from "@hooks/useAllMaxTrades";
import { bigNumberToDecimal, formatCurrency, mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";
import { Token } from "@utils/constants/tokens";

type MaxTradeTableProps = {
  token:Token;
  exchanges: Exchanges[];
  slippage: number;
};

const MaxTradeTable = ({
  token,
  exchanges,
  slippage,
}: MaxTradeTableProps): JSX.Element => {

  const maxTrade = useAllMaxTrade(token, slippage,exchanges);
  const tokenPrice = useCoinGeckoPrices([token.address]);

  return (
    <Box
      border={"1px solid #B9B6FC"}
      height={"500px"}
      borderRadius={"20px"}
      width={"35%"}
    >
      <DataTable>
        <Thead>
          <Tr>
            <DTh>
              Max Trade Size
            </DTh>
            <DTh>USD Value</DTh>
          </Tr>
        </Thead>
        <Tbody>
        {exchanges.map((exchange, index) => {
            return (
              <Tr key={index}>
                <DTd
                  isLoaded={!maxTrade.data[index].isLoading && !tokenPrice.isLoading}
                  isError={maxTrade.data[index].isError || tokenPrice.isError}
                >
                  {bigNumberToDecimal(maxTrade.data[index].data, 2)}
                </DTd>
                <DTd
                  isLoaded={!maxTrade.data[index].isLoading && !tokenPrice.isLoading}
                  isError={maxTrade.data[index].isError || tokenPrice.isError}
                >
                  $
                  {formatCurrency(
                    mulBigNumbers(tokenPrice.isFetched && !tokenPrice.isError ? tokenPrice.data[token.address] : null, maxTrade.data[index].data)
                  )}
                </DTd>
              </Tr>
            );
          })}
        </Tbody>
      </DataTable>
    </Box>
  );
};

export default MaxTradeTable;
