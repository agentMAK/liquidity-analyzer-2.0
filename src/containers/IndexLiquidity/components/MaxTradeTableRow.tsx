import { Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stat, StatHelpText, StatNumber, Tr } from "@chakra-ui/react";
import { DTd } from "@components/DataTable";
import useAllMaxTrade from "@hooks/useAllMaxTrades";
import {
  bigNumberToDecimal,
  formatCurrency,
  formatNum,
  mulBigNumbers,
} from "@utils/bigNumbers";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import { DEFAULTSLIPPAGE, Token } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import { useState } from "react";
type MaxTradeTableRowProps = {
  isLoading: boolean;
  isError: boolean;
  token: Token;
  tokenPrice: BigNumber;
};

const MaxTradeTableRow = ({
  isLoading,
  isError,
  token,
  tokenPrice,
}: MaxTradeTableRowProps): JSX.Element => {
  const [slippage, setSlippage] = useState<number>(DEFAULTSLIPPAGE);
  const maxTrade = useAllMaxTrade(
    token,
    slippage
  );


  const bestExchangeIndex =
    maxTrade.isAllLoaded &&
    maxTrade.data.reduce(
      (maxIndex, curr, currIndex, arr) =>
      (!arr[maxIndex].isError && !curr.isError) &&
        (arr[maxIndex].data as unknown as BigNumber).gt(
          curr.data as unknown as BigNumber
        )
          ? maxIndex
          : currIndex,
      0
    );

  const bestExchange = Object.values(Exchanges)[bestExchangeIndex as number];

  return (
    <Tr>
      <DTd isLoaded={maxTrade.isAllLoaded || isLoading}>
        <Flex alignItems={"center"} height={"52px"}>
          {DisplayExchange[bestExchange]}
        </Flex>
      </DTd>
      <DTd isLoaded={maxTrade.isAllLoaded} isError={isError}>
        <Stat height={"52px"}>
          {(maxTrade.isAllLoaded && maxTrade.data.length > 0 ) && (
            <StatNumber fontSize={"lg"} fontWeight={"medium"}>
              ${formatCurrency(
                mulBigNumbers(
                  tokenPrice,
                  maxTrade.data[bestExchangeIndex as number].data
                )
              )}
            </StatNumber>
          )}
          {maxTrade.isAllLoaded && maxTrade.data.length > 0 && (
            <StatHelpText mt={"4px"}>
              {bigNumberToDecimal(
                maxTrade.data[bestExchangeIndex as number].data,
                2
              )}
            </StatHelpText>
          )}
        </Stat>
      </DTd>
      <DTd isLoaded={!isLoading}>
        <NumberInput step={0.5} precision={2} width={'120px'} onChange={(value) => setSlippage(parseFloat(value.replace("%",'')))}
              value={slippage+"%"}
              min={0.1}
              max={50}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </DTd>
    </Tr>
  );
};

export default MaxTradeTableRow;
