import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { PageEditor } from "dicty-components-page-editor"
import { ThemeProvider } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import { theme } from "app/layout/AppProviders"

type Props = {
  /** Page content object */
  data: ContentBySlugQuery["contentBySlug"]
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`${location.pathname}/edit`, {
      state: {
        data: data,
      },
    })
  }

  return (
    <Box>
      {data?.updated_by && (
        <InfoPageViewToolbar
          handleClick={handleClick}
          lastUpdate={data?.updated_at}
          user={data.updated_by}
        />
      )}
      <ThemeProvider theme={theme}>
        <PageEditor
          pageContent={data?.content}
          handleSave={() => {}}
          handleCancel={() => {}}
          readOnly
          theme={theme}
        />
      </ThemeProvider>
    </Box>
  )
}

export default InfoPageView
