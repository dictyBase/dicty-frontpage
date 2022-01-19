import type { AppProps } from "next/app"
import { AuthProvider } from "../components/features/Authentication/AuthStore"
import AppProviders from "./app/layout/AppProviders"
import App from "./app/layout/App"
import CssBaseline from "@material-ui/core/CssBaseline"

const DictyFrontPageApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App />
        <Component {...pageProps} />
      </AppProviders>
    </AuthProvider>
  )
}

export default DictyFrontPageApp
