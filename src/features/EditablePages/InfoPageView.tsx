import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { PageEditor } from "dicty-components-page-editor"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import { Content } from "./types"

const useStyles = makeStyles(({ palette }) => ({
  editor: {
    "& a": {
      cursor: "pointer",
      color: palette.primary.main,
      textDecoration: "none",
    },
  },
}))

type Props = {
  /** Page content object */
  data: Content
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: Props) => {
  const classes = useStyles()
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
    <Grid container justify="center">
      <Grid item xs={12} className={classes.editor}>
        <InfoPageViewToolbar
          handleClick={handleClick}
          lastUpdate={data.updated_at}
          user={data.updated_by}
        />
        <div>
          <PageEditor pageContent={data.content} readOnly />
        </div>
      </Grid>
    </Grid>
  )
}

export default InfoPageView
