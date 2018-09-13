import { injectGlobal } from "styled-components"
import "typeface-roboto"
import "typeface-roboto-condensed"
import "typeface-roboto-mono"
import "typeface-roboto-slab"

injectGlobal([
  `
    body {
        font-family: Roboto, sans-serif;
    }
`,
])
