import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CustomNextPage } from "../types";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const { getPageTitle: title } = Component;

  const pageTitle = title ? `${title} | Voxie` : "Voxie";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
