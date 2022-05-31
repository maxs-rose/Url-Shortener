import { AppRouter } from "@api/trpc/[trpc]";
import '@styles/globals.css'
import { withTRPC } from "@trpc/next";
import type { AppProps } from 'next/app'
import Head from "next/head";
import React from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
        <Head>
          <title>Url Shortener</title>
        </Head>
        <Component {...pageProps} />
      </>
  )
}

export default withTRPC<AppRouter>({
  config({ctx}) {
    const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : `http://localhost:3000/api/trpc`;

    return {
      url
    };
  }
})(MyApp);
