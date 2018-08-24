// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import AddNewsForm from "components/pages/News/AddNewsForm"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import { Banner, Header, Hdrtxt } from "styles/NewsStyles"

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

/**
 * This is the view component so an authorized user can add a news item.
 */

const AddNews = () => (
  <Authorization
    // eslint-disable-next-line
    render={({ canAddNews, verifiedToken }) => {
      return (
        <div>
          {canAddNews &&
            verifiedToken === false && <ErrorNotification error={error} />}
          {canAddNews && (
            <Flex wrap justify="center">
              <Box w="100%" pb={5}>
                <Banner>
                  <Header>Add Dicty News</Header>
                  <Hdrtxt>
                    <FontAwesome name="globe fa-2x" />
                  </Hdrtxt>
                </Banner>
              </Box>
              <br />
              <Box w="100%">
                <AddNewsForm />
              </Box>
            </Flex>
          )}
          {!canAddNews && (
            <ErrorNotification error="You have reached this page in error." />
          )}
        </div>
      )
    }}
  />
)

export default AddNews
