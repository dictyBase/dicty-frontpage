import { useNavigate, useLocation } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { PageEditor } from "dicty-components-page-editor"
import { useCreateContentMutation } from "dicty-graphql-schema"
import ErrorNotification from "features/Authentication/ErrorNotification"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import NAMESPACE from "common/constants/namespace"
import { appTheme } from "app/layout/AppProviders"

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    minHeight: "45px",
    textAlign: "center",
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
}))

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = () => {
  const location = useLocation()
  const slug = location.state?.subname || location.state?.name

  const {
    state: { token },
  } = useAuthStore()
  const { user, canEditPages, verifiedToken } = useAuthorization()
  const navigate = useNavigate()
  const classes = useStyles()
  const [createContent] = useCreateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const previousURL = location.state.url

  const handleSaveClick = (value: any) => {
    createContent({
      variables: {
        input: {
          name: slug,
          // eslint-disable-next-line camelcase
          created_by: user.id,
          content: JSON.stringify(value),
          namespace: NAMESPACE,
        },
      },
    })
    setTimeout(() => {
      navigate(previousURL)
    }, 800)
  }

  const handleCancelClick = () => {
    navigate(previousURL)
  }

  return (
    <>
      {canEditPages && !verifiedToken && <ErrorNotification error={error} />}
      <Box mb={2} className={classes.banner}>
        <Box mb={2}>
          <Typography variant="h2" gutterBottom>
            Add Editable Page for Route:
          </Typography>
        </Box>
        <Typography variant="h3">{previousURL}</Typography>
      </Box>
      <Box width="80%" m="auto">
        <PageEditor
          handleSave={handleSaveClick}
          handleCancel={handleCancelClick}
          readOnly={false}
          theme={appTheme}
        />
      </Box>
    </>
  )
}

export default AddPage
