import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CustomNextPage } from "../types";
import { SessionProvider } from "../contexts/SessionContexts";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
