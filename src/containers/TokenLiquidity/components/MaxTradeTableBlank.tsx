import { Box, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import DataTable, { DTd, DTh } from "@components/DataTable";
import { Exchanges } from "@utils/constants/exchanges";

const MaxTradeTableBlank = (props: any): JSX.Element => {
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
          {props.isLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => {
                  return (
                    <Tr key={index}>
                      <DTd isLoaded={false}>Blank</DTd>
                      <DTd isLoaded={false}>Blank</DTd>
                    </Tr>
                  );
                })
            : Object.values(Exchanges).map((exchangeKey, index) => {
                return (
                  <Tr key={index}>
                    <DTd>&nbsp;</DTd>
                    <DTd />
                  </Tr>
                );
              })}
        </Tbody>
      </DataTable>
    </Box>
  );
};

export default MaxTradeTableBlank;

MaxTradeTableBlank.defaultProps = {
  isLoaded: false,
};
