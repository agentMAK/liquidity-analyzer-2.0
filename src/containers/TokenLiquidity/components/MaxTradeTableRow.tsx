import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { DTd } from "@components/DataTable";
import { bigNumberToDecimal, formatCurrency } from "@utils/bigNumbers";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";

type MaxTradeTableRowProps = {
  exchange: Exchanges;
  tokenAddress: `0x${string}`;
  slippage: number;
};

const MaxTradeTableRow = ({
  tokenAddress,
  exchange,
  slippage,
}: MaxTradeTableRowProps): JSX.Element => {

  return (
    <Tr>
      {/* <Td>{bigNumberToDecimal(data,1)}</Td> */}
      <Td>$1000</Td>
    </Tr>
  );
};

export default MaxTradeTableRow;
