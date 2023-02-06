import { Box, Tbody, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import SlippageMessage from "@components/SlippageMessage";
import useCoinGeckoPrice from "@hooks/CoinGecko/useCoinGeckoPrice";
import useAllMaxTrade from "@hooks/useAllMaxTrades";
import { bigNumberToDecimal, formatCurrency, mulBigNumbers } from "@utils/bigNumbers";
import { Exchanges } from "@utils/constants/exchanges";

type MaxTradeTableProps = {
  tokenAddress: `0x${string}`;
  exchanges: Exchanges[];
  slippage: number;
};

const MaxTradeTable = ({
  tokenAddress,
  exchanges,
  slippage,
}: MaxTradeTableProps): JSX.Element => {
  const maxTrade = useAllMaxTrade(tokenAddress, slippage,exchanges);
  const tokenPrice = useCoinGeckoPrice(tokenAddress);

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
        {Object.values(exchanges).map((exchange, index) => {
            return (
              <Tr key={index}>
                <DTd
                  isLoaded={!maxTrade[index].isLoading && !tokenPrice.isLoading}
                  isError={maxTrade[index].isError || tokenPrice.isError}
                >
                  {bigNumberToDecimal(maxTrade[index].data, 2)}
                </DTd>
                <DTd
                  isLoaded={!maxTrade[index].isLoading && !tokenPrice.isLoading}
                  isError={maxTrade[index].isError || tokenPrice.isError}
                >
                  $
                  {formatCurrency(
                    mulBigNumbers(tokenPrice.data, maxTrade[index].data)
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
