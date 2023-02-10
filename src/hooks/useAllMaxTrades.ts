import { Exchanges} from "@utils/constants/exchanges";
import { useProvider } from "wagmi";
import { useQueries } from "react-query";
import fetchMaxTrade from "@utils/maxTrade";
import { Token } from "@utils/constants/tokens";
import { formatToken } from "@utils/formatting";

const useAllMaxTrade = (token:Token, maxSlippage: number, exchanges:Exchanges[] = Object.values(Exchanges)) => {
  let provider = useProvider();


  const allMaxTrades = useQueries(
    Object.values(exchanges).map((exchange) => {
      return {
        queryKey: ["fetchMaxTrade", token.address, exchange, maxSlippage],
        queryFn: async () =>
          formatToken(await fetchMaxTrade(token.address, exchange, maxSlippage, provider),token.decimals),
          enabled: exchanges.length > 0,
          refetchOnWindowFocus: false,
      };
    })
  );

  return {data: allMaxTrades, isAllLoaded: allMaxTrades.every((maxTrade) => maxTrade.isLoading === false)};

};

export default useAllMaxTrade;
