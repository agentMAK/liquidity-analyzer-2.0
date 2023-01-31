import { useQuery } from "react-query";
import axios from "axios";

const useCoinGeckoMarketData = (coingeckoID:string[]) => {
  const result = useQuery(["marketData",coingeckoID], async () => {
    const formattedIds = coingeckoID.map((id) => id.toLowerCase()).join(",");

    const resp = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${formattedIds}`
    );

    let marketData:any = {}
    resp.data.map((data:any) => { marketData[data.symbol.toUpperCase()] = data })
    return marketData;

  });
  return result;
};

export default useCoinGeckoMarketData;
