import { configureChains, createClient } from "wagmi";
import { mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: "iaW5JjMwBaeYBBj3RaQnxHMh4q4eNcM2" })]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
