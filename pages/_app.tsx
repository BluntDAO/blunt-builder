import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../configs/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { SWRConfig } from "swr";
import { useInitTheme } from "@/hooks/useInitTheme";
import localFont from "next/font/local";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export const pally = localFont({
  src: "../styles/Pally-Variable.ttf",
  display: "swap",
  variable: "--font-pally",
});

export const nns = localFont({
  src: "../styles/LondrinaSolid-NNS.ttf",
  display: "swap",
  variable: "--font-nns",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useInitTheme();

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Head>
            <meta property="og:title" content="blunts DAO" />
            <meta
              property="og:description"
              content="One Ounce, every day, forever. BluntsDAO is building the unlimited sesh fund to onboard the next million users to Web3, 1 blunt at a time. CC0 on Base."
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest.json" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`} />
            <meta
              property="og:image"
              content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/og-image.png`}
            />
          </Head>

          <main className={`${nns.variable} ${pally.variable}`}>
            <Component {...pageProps} />
            <Analytics />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
};
export default MyApp;
