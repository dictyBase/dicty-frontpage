import type { AppProps } from "next/app"
import Head from "next/head"

const FrontPageApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="The official homepage for dictyBase, your central resource for Dictyostelid genomics."
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>dictyBase</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default FrontPageApp
