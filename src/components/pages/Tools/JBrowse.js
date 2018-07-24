// @flow
import React from "react"
import { Flex, Box } from "rebass"
import { Link } from "styles"

/**
 * This displays genome browser links.
 */

const JBrowse = () => {
  return (
    <Flex justify="center">
      <Box style={{ textAlign: "center" }}>
        <h1>
          <strong>Genome Browser</strong>
        </h1>
        <p>
          {" "}
          The following genomes are currently available on the new genome
          browser:
          <br />
          <br />{" "}
        </p>
        <em>
          <p>
            <Link
              href="http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&amp;loc=1%3A2334653..2521452&amp;tracks=transcript%2CtRNA%2Cgene%2Cretino2&amp;highlight="
              title="D. discoideum"
              target="new">
              D. discoideum
            </Link>
          </p>
          <p>
            <Link
              href="http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fpurpureum&amp;loc=scaffold_1%3A89486..146533&amp;tracks=&amp;highlight="
              title="D. purpureum"
              target="new">
              D. purpureum
            </Link>
          </p>
          <p>
            <Link
              href="http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fpallidum&amp;loc=PPA1267848%3A582884..992552&amp;tracks=tblastn_discoideum%2Ctranscript%2Cgene&amp;highlight="
              title="P. pallidum"
              target="new">
              P. pallidum
            </Link>
          </p>
          <p>
            <Link
              href="http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Ffasciculatum&amp;loc=DFA1435654%3A879778..900543&amp;tracks=gene%2CtRNA%2Ctranscript%2Ctblastn_discoideum%2Creference&amp;highlight="
              title="D. fasciculatum"
              target="new">
              D. fasciculatum
            </Link>
          </p>
        </em>
      </Box>
    </Flex>
  )
}

export default JBrowse
