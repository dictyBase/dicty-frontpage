// @flow
import React from "react"
import { Flex, Box } from "rebass"

import AddPageForm from "components/pages/EditablePages/AddPageForm"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import { Banner } from "styles/NewsStyles"

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

type Props = {
  // the location object passed in by React Router
  location: Object,
}

/**
 * This is the view component so an authorized user can add a news item.
 */

const AddPage = (props: Props) => {
  const {
    location: {
      state: { slug, url },
    },
  } = props

  return (
    <Authorization
      // eslint-disable-next-line
      render={({ canEditPages, verifiedToken }) => {
        return (
          <div>
            {canEditPages &&
              verifiedToken === false && <ErrorNotification error={error} />}
            {canEditPages && (
              <Flex wrap justify="center">
                <Box w="100%" pb={5}>
                  <Banner>
                    <h2>Add Editable Page for Route:</h2>
                    <h3>{url}</h3>
                  </Banner>
                </Box>
                <br />
                <Box w="100%">
                  {/* <AddPageForm slug={slug} url={url} /> */}
                  editor coming soon
                </Box>
              </Flex>
            )}
            {!canEditPages && (
              <ErrorNotification error="You have reached this page in error." />
            )}
          </div>
        )
      }}
    />
  )
}

export default AddPage
