import { Box, Flex, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useAllMaxTrade from "@hooks/useAllMaxTrades";
import useMaxTrade from "@hooks/useMaxTrade";
import { _1000 } from "@uniswap/v2-sdk/dist/constants";
import { bigNumberToDecimal, formatCurrency } from "@utils/bigNumbers";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import { DEFAULTSLIPPAGE } from "@utils/constants/tokens";
import { all } from "axios";
import { BigNumber } from "ethers";
import MaxTradeTableRow from "./MaxTradeTableRow";

type MaxTradeTableProps = {
  tokenAddress: `0x${string}`;
  exchanges: string[];
};

const MaxTradeTable = ({
  tokenAddress,
  exchanges,
}: MaxTradeTableProps): JSX.Element => {

  console.log(exchanges)

  const allMaxTrades = useAllMaxTrade(tokenAddress, 0.5);
  console.log(allMaxTrades)

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
            <DTh>No of Trades</DTh>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(exchanges).map((exchange, index) => {
              return (
                <Tr key={index}>
                  <Td>{allMaxTrades.data[exchange]?.size}</Td>
                  <Td>$1000</Td>
                </Tr>
              );
          })}
        </Tbody>
      </DataTable>
    </Box>
  );
};

export default MaxTradeTable;
