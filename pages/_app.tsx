import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CustomNextPage } from "../types";
import SessionProvider from "../providers/SessionProvider";
import WebRtc from "modules/WebRtc";
import WebSocketProvider from "providers/WebSocketProvider";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  return (
    <SessionProvider>
      <WebSocketProvider>
        <Component {...pageProps} />
        <WebRtc />
      </WebSocketProvider>
    </SessionProvider>
  );
}

export default MyApp;
