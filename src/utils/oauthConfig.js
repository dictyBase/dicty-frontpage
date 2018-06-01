// @flow
import clientConfig from "utils/clientConfig"

// const getRandomString = (length) => {
// const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
// let text = ''
// for (let i = 0; i < length; i += 1) {
// text += possible.charAt(Math.floor(Math.random() * length))
// }
// return text
// }

const oauthConfig = {
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
    authorizationEndpoint: "https://www.linkedin.com/uas/oauth2/authorization",
    clientId: clientConfig.linkedin.clientId,
    redirectUrl: `${window.location.origin}/linkedin/callback`,
    scopes: ["r_emailaddress"],
    scopeDelimiter: " ",
    requiredUrlParams: [["state", "linkedin"], ["response_type", "code"]],
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
  facebook: {
    name: "Facebook",
    url: "/auth/facebook",
    authorizationEndpoint: "https://www.facebook.com/dialog/oauth",
    clientId: clientConfig.facebook.clientId,
    redirectUrl: `${window.location.origin}/facebook/callback`,
    scopes: ["email"],
    scopeDelimiter: ",",
    optionalUrlParams: [["state", "facebook"], ["response_type", "code"]],
    popupOptions: { width: 1028, height: 640 },
  },
}

export default oauthConfig
