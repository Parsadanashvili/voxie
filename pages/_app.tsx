import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CustomNextPage } from "../types";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const pageTitle = ["Voxie", "-", Component.getPageTitle ?? "Voice rooms"];

  return (
    <>
      <Head>
        <title>{pageTitle.join(" ")}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
