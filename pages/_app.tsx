import { AppProps } from "next/app";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#000" options={{ showSpinnner: false }} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
