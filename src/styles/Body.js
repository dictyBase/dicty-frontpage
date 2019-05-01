import { injectGlobal } from "styled-components"
import "typeface-roboto"
import "typeface-roboto-condensed"
import "typeface-roboto-mono"
import "typeface-roboto-slab"
import "typeface-lato"
import "typeface-merriweather"
import "typeface-montserrat"

injectGlobal([
  `
    body {
        font-family: Roboto, sans-serif;
    }
`,
])
