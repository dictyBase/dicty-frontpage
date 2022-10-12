import "@testing-library/jest-dom"
import mockFetch from "jest-fetch-mock"

mockFetch.enableMocks()

jest.mock("common/utils/environmentalVariables", () => ({
  getFooterJSON: () =>
    "https://raw.githubusercontent.com/dictyBase/migration-data/master/footer/footer-condensed.json",
  getNavBarJSON: () =>
    "https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.json",
  getAltGraphQLServer: () => "https://betagraphql.dictycr.org",
  getDeployEnvironment: () => "production",
}))
