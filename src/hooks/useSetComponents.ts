import { useQuery } from "react-query";
import axios from "axios";

export type TokenSet =
  | "dpi"
  | "bed"
  | "mvi"
  | "eth2x-fli"
  | "btc2x-fli"
  | "dseth"
  | "iceth"
  | "index";

const useSetComponents = (token: TokenSet) => {
  const result = useQuery(["tokenSetsPortolios", token], async () => {
    const resp = await axios.get(
      `https://api.tokensets.com/public/v2/portfolios/${token}`
    );
    return resp.data.portfolio.components;
  });
  return result;
};

export default useSetComponents;
