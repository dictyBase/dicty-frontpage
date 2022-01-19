import type { AppProps } from "next/app"
import { AuthProvider } from "../components/features/Authentication/AuthStore"
import AppProviders from "../components/layout/AppProviders"
import App from "../components/layout/App"
import CssBaseline from "@material-ui/core/CssBaseline"
import Head from "next/head"

const DictyFrontPageApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App>
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
        </App>
        <Component {...pageProps} />
      </AppProviders>
    </AuthProvider>
  )
}

export default DictyFrontPageApp
