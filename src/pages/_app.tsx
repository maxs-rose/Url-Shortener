import { AppRouter } from "@backend/router";
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
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

function getBaseUrl() {
	if (typeof window !== undefined) return '';

	return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}`: `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		return {
			url: getBaseUrl()
		};
	},
	ssr: true,
})(MyApp);
