import clientConfig from "./clientConfig"

describe("common/utils/clientConfig", () => {
    it("should have a value for google", () => {
        expect(clientConfig.google).toBeTruthy();
      })
    it("should have a value for linkedin", () => {
        expect(clientConfig.linkedin).toBeTruthy();
    })
    it("should have a value for orcid", () => {
        expect(clientConfig.orcid).toBeTruthy();
    })
})
