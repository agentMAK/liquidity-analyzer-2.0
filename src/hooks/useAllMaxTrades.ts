import { Exchanges} from "@utils/constants/exchanges";
import { useProvider } from "wagmi";
import { useQueries } from "react-query";
import fetchMaxTrade from "@utils/constants/maxTrade";

const useAllMaxTrade = (tokenAddress: string, maxSlippage: number, exchanges:Exchanges[] = Object.values(Exchanges)) => {
  let provider = useProvider();


  const allMaxTrades = useQueries(
    Object.values(exchanges).map((exchange) => {
      return {
        queryKey: ["fetchMaxTrade", tokenAddress, exchange, maxSlippage],
        queryFn: () =>
          fetchMaxTrade(tokenAddress, exchange, maxSlippage, provider),
      };
    })
  );

  return allMaxTrades;

};

export default useAllMaxTrade;
