import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackToHomepageButton from "common/components/BackToHomepageButton"
import useAuthorization from "common/hooks/useAuthorization"
import sadDicty from "common/assets/sad-dicty.png"
import useStyles from "./errorStyles"

type Props = {
  /** Error message to display*/
  error: string
}

type Params = {
  /** Name param in URL */
  name: string
  /** Subname param in URL */
  subname: string
}

/**
 * UI display when an item was not found.
 */

const NotFoundError = ({ error }: Props) => {
  const { name, subname } = useParams<Params>()
  const location = useLocation()
  const { canEditPages, verifiedToken } = useAuthorization()
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
          <h3>Page Not Found</h3>
          <p className={classes.paragraph}>
            Sorry! We can&apos;t find that page.
          </p>
          <p className={classes.paragraph}>
            You can try one of the links in our navbar above, or head back to
            the homepage.
          </p>
          <BackToHomepageButton />
          {canEditPages && verifiedToken && (
            <div>
              <br />
              <Link
                className={classes.link}
                to={{
                  pathname: "/addpage",
                  state: {
                    name: name,
                    subname: subname,
                    url: location.pathname,
                  },
                }}>
                <Button
                  className={classes.addPageButton}
                  size="small"
                  variant="contained"
                  color="primary">
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; Add a page to this route
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default NotFoundError
