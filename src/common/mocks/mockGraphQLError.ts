const mockNotFoundError = {
  errors: [
    {
      message: "could not find gene with ID banana",
      path: ["gene"],
      extensions: { code: "NotFound" },
      locations: undefined,
      nodes: undefined,
      source: undefined,
      positions: undefined,
      originalError: undefined,
      name: "",
    },
  ],
}

const mockUnavailableError = {
  errors: [
    {
      message: "server is unavailable",
      path: ["gene"],
      extensions: { code: "Unavailable" },
      locations: undefined,
      nodes: undefined,
      source: undefined,
      positions: undefined,
      originalError: undefined,
      name: "",
    },
  ],
}

const mockOtherError = {
  errors: [
    {
      message: "unknown test error",
      path: ["gene"],
      extensions: { code: "Unknown" },
      locations: undefined,
      nodes: undefined,
      source: undefined,
      positions: undefined,
      originalError: undefined,
      name: "",
    },
  ],
}

export { mockNotFoundError, mockOtherError, mockUnavailableError }
