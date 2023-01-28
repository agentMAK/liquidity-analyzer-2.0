import { Box, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useAllMaxTrade from "@hooks/useAllMaxTrades";
import useCoinGeckoPrice from "@hooks/useCoinGeckoPrice";
import { _1000 } from "@uniswap/v2-sdk/dist/constants";
import {
  bigNumberToDecimal,
  formatCurrency,
  mulBigNumbers,
} from "@utils/bigNumbers";

type MaxTradeTableProps = {
  tokenAddress: `0x${string}`;
  exchanges: string[];
};

const MaxTradeTable = ({
  tokenAddress,
  exchanges,
}: MaxTradeTableProps): JSX.Element => {


  const maxTrade = useAllMaxTrade(tokenAddress, 0.5);
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
            <DTh>Max Trade Size</DTh>
            <DTh>USD Value</DTh>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(exchanges).map((exchange, index) => {
            return (
              <Tr key={index}>
                <DTd
                  isLoaded={!maxTrade.isLoading && !tokenPrice.isLoading}
                  isError={maxTrade.isError || tokenPrice.isError}
                >
                  {bigNumberToDecimal(maxTrade.data[exchange]?.toString(), 2)}
                </DTd>
                <DTd
                  isLoaded={!maxTrade.isLoading && !tokenPrice.isLoading}
                  isError={maxTrade.isError || tokenPrice.isError}
                >
                  $
                  {formatCurrency(
                    mulBigNumbers(tokenPrice.data, maxTrade.data[exchange])
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
