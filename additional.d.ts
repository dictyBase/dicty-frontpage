/// <reference types="next" />
import "typescript"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASENAME: string
      NEXT_PUBLIC_GA_TRACKING_ID: string
      NEXT_PUBLIC_NAVBAR_JSON: string
      NEXT_PUBLIC_FOOTER_JSON: string
      NEXT_PUBLIC_GRAPHQL_SERVER: string
      // the alternate graphql server used to prevent cross-site cookie issues
      NEXT_PUBLIC_ALT_GRAPHQL_SERVER: string
      // Activates mock service worker
      NEXT_PUBLIC_MOCK_SERVER: "on" | "off"
      // used to differentiate between deploy environments, specifically for using correct GraphQL URL
      DEPLOY_ENV: "development" | "staging" | "production"
    }
  }
}
