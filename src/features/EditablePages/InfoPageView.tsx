import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { PageEditor } from "dicty-components-page-editor"
import Box from "@material-ui/core/Box"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

type Props = {
  /** Page content object */
  data: ContentBySlugQuery["contentBySlug"]
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: Props) => {
  const history = useHistory()
  const location = useLocation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    history.push({
      pathname: `${location.pathname}/edit`,
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
      <PageEditor pageContent={data?.content} readOnly />
    </Box>
  )
}

export default InfoPageView
