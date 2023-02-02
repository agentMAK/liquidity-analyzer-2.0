import type { AppProps } from "next/app";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";
import { client } from "@utils/wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@components/Header";
const queryClient = new QueryClient();
import theme from "@theme/index";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import Head from "@components/Head";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <ChakraProvider theme={theme}>
          <Head />
          <Header />
          {mounted && <Component {...pageProps} />}
        </ChakraProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;
