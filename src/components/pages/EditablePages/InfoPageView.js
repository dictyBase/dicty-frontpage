// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import PageEditor from "components/editor/PageEditor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
import { ContentAPI } from "utils/apiClasses"
import { editPage } from "actions/editablePages"
import { fetchUserInfo } from "actions/auth"
import FontAwesome from "react-fontawesome"
import {
  ToolbarNav,
  TextInfo,
  Label,
  InlineLink,
} from "styles/EditablePageStyles"

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

type Props = {
  /** React Router's match object */
  match: Object,
  /** action creator for editing the current page content */
  editPageAction: Function,
  /** action creator to fetch a non-authenticated user's information */
  fetchUserInfoAction: Function,
  /** the object that contains page data from current state */
  page: Object,
}

/** Displays the page data that was fetched from the InfoPage component */

class InfoPageView extends Component<Props> {
  componentDidMount() {
    const { page, fetchUserInfoAction } = this.props

    const fetchedUser = new ContentAPI(page).getUser()
    fetchUserInfoAction(fetchedUser)
  }

  onClick = e => {
    e.preventDefault()
    const { editPageAction, match, page } = this.props

    editPageAction(page.data.attributes.content, match.url)
  }

  render() {
    const { page, match } = this.props

    return (
      <Flex justify="center">
        <Box>
          <Authorization
            // eslint-disable-next-line
            render={({ canEditPages, fetchedUserData, verifiedToken }) => {
              return (
                <div>
                  {canEditPages &&
                    verifiedToken === false && (
                      <ErrorNotification error={error} />
                    )}
                  <br />
                  {canEditPages &&
                    fetchedUserData && (
                      <ToolbarNav>
                        <Flex justify="center">
                          <Box>
                            <TextInfo>
                              <strong>
                                <FontAwesome name="user" />{" "}
                                {fetchedUserData.getFullName()}
                              </strong>{" "}
                              edited{" "}
                              {timeSince(page.data.attributes.updated_at)} ago
                            </TextInfo>
                          </Box>
                          <Box ml="auto">
                            <Label>{fetchedUserData.getRoles()}</Label> &nbsp;
                            {verifiedToken && (
                              <InlineLink onClick={this.onClick}>
                                <FontAwesome name="pencil" title="Edit page" />
                              </InlineLink>
                            )}
                          </Box>
                        </Flex>
                      </ToolbarNav>
                    )}
                </div>
              )
            }}
          />

          <Flex>
            <Box>
              <PageEditor page={page} readOnly match={match} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  null,
  { editPageAction: editPage, fetchUserInfoAction: fetchUserInfo },
)(InfoPageView)
