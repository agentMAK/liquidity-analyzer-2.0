import NextHead from "next/head";
import { useRouter } from "next/router";

export const WEBSITE_HOST_URL = "https://liquidity-analyzer.vercel.app/";

export interface MetaProps {
  image?: string;
  title: string;
  type?: string;
}

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();

  const meta: MetaProps = {
    title: "Index Coop - Liquidity Analyzer",
    image: `/favicon.svg`,
    type: "website",
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </NextHead>
  );
};

export default Head;
