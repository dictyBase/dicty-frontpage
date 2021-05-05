import React from "react"
import { BrowserRouter } from "react-router-dom"
import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { User } from "dicty-graphql-schema"
import { AuthContext, authReducer } from "features/Authentication/AuthStore"

type AuthProps = {
  children: React.ReactNode
  mocks: ReadonlyArray<MockedResponse>
  user?: User
  /** Indicates if auth state should include valid token, default is true */
  validToken?: boolean
}

const MockSuperuser = {
  id: "999",
  first_name: "Art",
  last_name: "Vandelay",
  email: "george@vandelayindustries.com",
  is_active: true,
  created_at: 123456,
  updated_at: 678900,
  roles: [
    {
      id: "1",
      role: "superuser",
      description: "total power!",
      created_at: 123456,
      updated_at: 678900,
      permissions: [
        {
          id: "1",
          permission: "test",
          description: "a test permission",
          resource: "testresource",
          created_at: 123456,
          updated_at: 678900,
        },
      ],
    },
  ],
}

const expiredToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNDE2MjM5MDIyfQ.lAF-llZT8AfnYVNyF2Qew_Gv-omVDeJJVcgw6MYKgSUglcAa-sPqdfOYDoOmED82RXawv8VEX6pae-IKdTPKlLlSID-OP-2JKw8pK2gDmTTpSX95oPsVv_rSRhJUlT0miIM-gadcMBNaJjHAsVobzMJIbX6Har_XBrISWwRxaf2XNwDz2IJKg3r1h9jN1PyGICBh06UWwVt15306l5x-40adQ3pekkRRWUvyscdLp4_eCqs62r9yGKMJkqx8anlX9dNW2TToHgNEaV3qIivIgABvV9Z66dQ1OLfxlvd9V-d8BWp6pFn9eSNJN5qo66nd3Fqy4a5M8o5E269huCxahQ"

const activeToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo1NTE2MjM5MDIyfQ.Twt1dSBv6Jha3dqWvyUWI4G_ySJsWTD3av30TDtsnyIBPgXwVM3KtPA_YaDw-iO9pfFWZXc2wFUQ6q5WjNwy14yf7IEf2-r_r78jn9tq8a-vSmlr3ieK-Wjg6Y_U8pa4ZXy2zdrtf7IxA2Jz25Vj-BKtW7z_D00qm6EqSGT46fs9Dh0e1zcuCfOwq-STMLFzIbdcpOzvgtyVfyo-P89qhBWooTBt11xR0HeEr5_gJMThXBLtgzT6t_FYzQj3GadPvUQg3gf3qsPOCYk5TNlTIzJXD6yNtncF1MGSpacKTXJFTi3zf_zzpFkBmftPPEicqJo0CrqGO66JdJby8RZE1w"

const MockAuthProvider = ({
  children,
  mocks,
  user = MockSuperuser,
  validToken = true,
}: AuthProps) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    token: validToken ? activeToken : expiredToken,
    user: user,
    provider: "google",
    isAuthenticated: true,
    error: null,
  })
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>{children}</BrowserRouter>
      </MockedProvider>
    </AuthContext.Provider>
  )
}

export { MockSuperuser }
export default MockAuthProvider
