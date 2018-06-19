// @flow
import React from "react"
import { Flex, Box } from "rebass"
import EditNewsForm from "./EditNewsForm"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import { Banner, Header } from "styles/NewsStyles"

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

/**
 * This is the view component so an authorized user can add a news item.
 */

const EditNews = () => {
  return (
    <Authorization
      render={({ canAddNews, verifiedToken }) => {
        return (
          <div>
            {canAddNews &&
              verifiedToken === false && <ErrorNotification error={error} />}
            <br />
            {canAddNews && (
              <Flex wrap justify="center">
                <Box w={"100%"}>
                  <Banner>
                    <Header>Edit Dicty News</Header>
                  </Banner>
                </Box>
                <br />
                <Box w={"100%"}>
                  <EditNewsForm />
                </Box>
              </Flex>
            )}
            {!canAddNews && (
              <ErrorNotification
                error={"You have reached this page in error."}
              />
            )}
          </div>
        )
      }}
    />
  )
}

export default EditNews
