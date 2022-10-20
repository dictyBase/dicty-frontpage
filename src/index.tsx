import "common/utils/polyfills"
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { AuthProvider } from "features/Authentication/AuthStore"
import { App } from "app/layout/App"
import AppProviders from "app/layout/AppProviders"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"

const main = async () => {
  // Activate MSW
  if (import.meta.env.VITE_APP_MOCK_SERVER === "on") {
    const { default: worker } = await import("mocks/browser")
    await worker.start()
  }

  ReactDOM.render(
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App />
      </AppProviders>
    </AuthProvider>,
    document.querySelector("#root"),
  )
}

main()
