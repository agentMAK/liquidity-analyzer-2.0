import { Link, textDecoration, Tr } from "@chakra-ui/react";
import { DTd } from "@components/DataTable";
import { formatCurrency } from "@utils/bigNumbers";
import { DisplayExchange, Exchanges } from "@utils/constants/exchanges";
import { NULL_ADDRESS } from "@utils/constants/tokens";
import { BigNumber } from "ethers";
import { isError } from "util";

type TVLTableRowProps = {
  exchange: Exchanges;
  tvl: BigNumber;
  address: string;
  isLoading: boolean;
  isError: boolean;
};

const TVLTableRow = ({
  exchange,
  tvl,
  address,
  isLoading,
  isError,
}: TVLTableRowProps): JSX.Element => {
  return (
    <Tr role="group">
      <DTd isLoaded={!isLoading} isError={isError}>
        {!address || address === NULL_ADDRESS ? (
          DisplayExchange[exchange]
        ) : (
          <Link
            href={"https://etherscan.io/address/" + address}
            _hover={{ textDecoration: "none" }}
            isExternal
          >
            {DisplayExchange[exchange]}
          </Link>
        )}
      </DTd>
      <DTd isLoaded={!isLoading} isError={isError}>
        ${formatCurrency(tvl)}
      </DTd>
    </Tr>
  );
};

export default TVLTableRow;
