import { Thead, Tbody, Tr, Box } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import useSetComponents, { TokenSet } from "@hooks/useSetComponents";

type IndexLiquidityContainerProps = {
  tokenComponents: any;
  tokenChosen: boolean;
};

const IndexLiquidityContainer = ({
  tokenComponents,
  tokenChosen,
}: IndexLiquidityContainerProps): JSX.Element => {
  return (
    <Box mt={"20px"} mb={"50px"} width={"100%"} display={"flex"} gap={"12px"}>
      <Box
        border={"1px solid #B9B6FC"}
        borderRadius={"20px"}
        width={"100%"}
        minHeight={"500px"}
      >
        <DataTable>
          <Thead>
            <Tr>
              <DTh>Component</DTh>
              <DTh>Weight %</DTh>
            </Tr>
          </Thead>
          <Tbody>
            {!tokenChosen ? (
              <Tr></Tr>
            ) : tokenComponents.isLoading ? (
              <Tr>
                <DTd isLoaded={false}>Loading</DTd>
                <DTd isLoaded={false}>Loading</DTd>
              </Tr>
            ) : (
              Object.values(tokenComponents.data).map(
                (component: any, index) => {
                  return (
                    <Tr key={index}>
                      <DTd
                        isLoaded={!tokenComponents.isLoading}
                        isError={tokenComponents.isError}
                        isTitle={true}
                      >
                        {component.symbol}
                      </DTd>
                      <DTd
                        isLoaded={!tokenComponents.isLoading}
                        isError={tokenComponents.isError}
                      >
                        {component.percent_of_set}
                      </DTd>
                    </Tr>
                  );
                }
              )
            )}
          </Tbody>
        </DataTable>
      </Box>
    </Box>
  );
};

export default IndexLiquidityContainer;
