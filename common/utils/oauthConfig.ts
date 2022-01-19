import clientConfig from "common/utils/clientConfig"

type Config = {
  name: string
  url: string
  authorizationEndpoint: string
  clientId: string
  redirectUrl: string
  requiredUrlParams: Array<Array<string>>
  scopes: Array<string>
  scopeDelimiter: string
  optionalUrlParams?: Array<Array<string>>
  popupOptions: {
    width: number
    height: number
  }
}

type Auth = {
  google: Config
  linkedin: Config
  orcid: Config
  [index: string]: any
}

const oauthConfig: Auth = {
  google: {
    name: "Google",
    url: "/auth/google",
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    clientId: clientConfig.google.clientId,
    redirectUrl: `${window.location.origin}/google/callback`,
    requiredUrlParams: [["response_type", "code"]],
    scopes: ["email"],
    scopeDelimiter: " ",
    optionalUrlParams: [["state", "google"]],
    popupOptions: { width: 1020, height: 633 },
  },
  linkedin: {
    name: "LinkedIn",
    url: "/auth/linkedin",
    authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
    clientId: clientConfig.linkedin.clientId,
    redirectUrl: `${window.location.origin}/linkedin/callback`,
    scopes: ["r_emailaddress"],
    scopeDelimiter: " ",
    requiredUrlParams: [
      ["state", "linkedin"],
      ["response_type", "code"],
    ],
    popupOptions: { width: 1028, height: 640 },
  },
  orcid: {
    name: "ORCID",
    url: "/auth/orcid",
    authorizationEndpoint: "https://orcid.org/oauth/authorize",
    clientId: clientConfig.orcid.clientId,
    redirectUrl: `${window.location.origin}/orcid/callback`,
    scopes: ["/authenticate"],
    scopeDelimiter: " ",
    requiredUrlParams: [["response_type", "code"]],
    popupOptions: { width: 1028, height: 640 },
  },
}

export default oauthConfig
