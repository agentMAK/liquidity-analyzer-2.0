import { Tr } from "@chakra-ui/react";
import { DTd } from "@components/DataTable";
import { formatCurrency } from "@utils/bigNumbers";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import { BigNumber } from "ethers";

type TVLTableRowProps = {
    exchange:Exchanges,
    tvl:BigNumber,
    isLoading:boolean,
    isError:boolean,
}

const TVLTableRow = ({exchange,tvl,isLoading,isError}:TVLTableRowProps): JSX.Element => {

  return (
    <Tr>
      <DTd
        isLoaded={!isLoading}
        isError={isError}
        isTitle={true}
      >
          {DisplayExchange[exchange]}
      </DTd>
      <DTd isLoaded={!isLoading} isError={isError}>
        ${formatCurrency(tvl)}
      </DTd>
    </Tr>
  );
};

export default TVLTableRow;
