import { Thead, Tbody, Tr, Box, Tfoot, Th } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useCoinGeckoPrices from "@hooks/CoinGecko/useCoinGeckoPrices";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import ComponentTableRow from "./components/ComponentsTableRow";
import MaxTradeTableRow from "./components/MaxTradeTableRow";

type RebalanceContainerProps = {
  tokenComponents: any;
  indexMarketCap: number;
  isLoading: boolean;
  isError: boolean;
};

const RebalanceContainer = ({
  tokenComponents,
  indexMarketCap,
  isLoading,
  isError,
}: RebalanceContainerProps): JSX.Element => {
  const tokenPrices = useCoinGeckoPrices(
    isLoading
      ? []
      : Object.values(tokenComponents).map(
          (component: any) => component.address
        )
  );
  const [targets, setTargets] = useState<any>({});


  useEffect(() => {
    let targetsInit: any = {};
    if (!isLoading) {
      Object.values(tokenComponents).map((component: any) => {
        targetsInit[component.address] = parseFloat(component.percent_of_set);
      });
      setTargets(targetsInit);
    }
  }, [isLoading,tokenComponents]);

  let tokenWeightTotal =
    (!isLoading &&
      Object.values(tokenComponents).reduce(
        (acc: number, curr: any) => acc + parseFloat(curr.percent_of_set),
        0
      )) ||
    0;

    let targetPercentageTotal =  !isLoading ? Object.values(targets).reduce((acc:number, curr:any) => acc + parseFloat(curr) , 0) : 0

  return (
    <Box mt={"20px"} mb={"50px"} width={"100%"} display={"flex"} gap={"12px"}>
      <Box
        border={"1px solid #B9B6FC"}
        borderRadius={"20px"}
        minHeight={"500px"}
        width={"65%"}
      >
        <DataTable>
          <Thead>
            <Tr>
              <DTh>Component</DTh>
              <DTh>Weight %</DTh>
              <DTh>Target %</DTh>
              <DTh>Change</DTh>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
              </Tr>
            ) : (
              Object.values(tokenComponents).map((component: any, index) => {
                return (
                  <ComponentTableRow
                    isLoading={isLoading}
                    isError={isError}
                    component={component}
                    key={index}
                    indexMarketCap={indexMarketCap}
                    rebalanceView={true}
                    target={targets[component.address]}
                    setTarget={(newTarget: number) => setTargets({...targets, [component.address]: newTarget})}
                  />
                );
              })
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize={"16px"} padding={'24px 24px'}>Total</Th>
              <Th fontSize={"16px"}>{tokenWeightTotal.toFixed(2)}</Th>
              <Th fontSize={"16px"} pl={'40px'}>{targetPercentageTotal.toFixed(2)}</Th>
            </Tr>
          </Tfoot>
        </DataTable>
      </Box>
      <Box
        border={"1px solid #B9B6FC"}
        borderRadius={"20px"}
        minHeight={"500px"}
      >
        <DataTable>
          <Thead>
            <Tr>
              <DTh>Best Exchange</DTh>
              <DTh>Max Trade</DTh>
              <DTh>Slippage</DTh>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
                <DTd isLoaded={false}><Box height={'52px'}>Loading</Box></DTd>
              </Tr>
            ) : (
              Object.values(tokenComponents).map((component: any, index) => {
                return (
                  <MaxTradeTableRow
                    key={index}
                    isLoading={isLoading || tokenPrices.isLoading}
                    isError={isError || tokenPrices.isError}
                    token={{
                      chainId: 1,
                      address: component.address,
                      name: component.name,
                      symbol: component.symbol,
                      decimals: component.decimals,
                      logoURI: "",
                      extensions: undefined,
                      coinGeckoId: undefined,
                      tokenSetId: component.id,
                    }}
                    tokenPrice={
                      isLoading || tokenPrices.isLoading
                        ? BigNumber.from(0)
                        : tokenPrices.data[component.address]
                    }
                  />
                );
              })
            )}
          </Tbody>
        </DataTable>
      </Box>
    </Box>
  );
};

export default RebalanceContainer;
