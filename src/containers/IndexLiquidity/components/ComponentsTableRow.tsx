import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Tbody,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DTd } from "@components/DataTable";
import { formatNum } from "@utils/bigNumbers";
import { useState } from "react";

type ComponentTableRowProps = {
  isLoading: boolean;
  isError: boolean;
  component: any;
  indexMarketCap: number;
  rebalanceView: boolean;
  target?: number;
  setTarget?: (value: number) => void;
};

const ComponentTableRow = ({
  isLoading,
  isError,
  component,
  indexMarketCap,
  rebalanceView,
  target,
  setTarget,
}: ComponentTableRowProps): JSX.Element => {

  const percentageChange = (target || 0) - component.percent_of_set;
  const dollarChange = percentageChange * 0.01 * indexMarketCap

  return (
    <Tr>
      <DTd isLoaded={!isLoading} isError={isError} isTitle={true}>
        <Flex height={'52px'} alignItems={'center'}>{component.symbol}</Flex>
      </DTd>
      <DTd isLoaded={!isLoading}>
        {parseFloat(component.percent_of_set).toFixed(2)}
      </DTd>
      {rebalanceView && (
      <DTd isLoaded={!isLoading}>
        <NumberInput value={target+'%'} onChange={(value) => setTarget && setTarget(parseFloat(value.replace("%",'')))} precision={2} width={'120px'}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </DTd>)}
      {rebalanceView && (
      <DTd>
        <Stat>
          <StatNumber fontSize={"lg"} fontWeight={"medium"} minWidth={'140px'}>
            ${formatNum(dollarChange.toFixed(2))}
          </StatNumber>
          <StatHelpText mt={"4px"} >
            <StatArrow type={percentageChange > 0 ? "increase" : "decrease"} display={percentageChange === 0 ? 'none' : 'inline-block'}/>
            {percentageChange.toFixed(2)}Δ%
          </StatHelpText>
        </Stat>
      </DTd>)}
    </Tr>
  );
};

export default ComponentTableRow;
