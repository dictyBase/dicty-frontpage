// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import PageEditor from "components/editor/PageEditor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
import { AuthenticatedUser, ContentAPI } from "utils/apiClasses"
import { editPage } from "actions/editablePages"
import { fetchUserInfo } from "actions/auth"
import FontAwesome from "react-fontawesome"
import {
  Container,
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
  editPage: Function,
  /** action creator to fetch a non-authenticated user's information */
  fetchUserInfo: Function,
  /** the object that contains page data from current state */
  page: Object,
  /** contains the object representing the fetched user's data */
  fetchedUserData: Object,
  /** contains the object representing the logged in user's data */
  loggedInUser: Object,
}

type State = {
  editorState: EditorState,
}

/** Displays the info page data that was fetched from the ExplorePage component */

class ExplorePageView extends Component<Props, State> {
  componentDidMount() {
    const fetchedUser = new ContentAPI(this.props.page).getUser()
    this.props.fetchUserInfo(fetchedUser)
  }
  render() {
    const { updated_at } = this.props.page.data.attributes
    const { loggedInUser } = this.props

    return (
      <Container>
        <Authorization
          render={({ canEditPages, fetchedUserData, verifiedToken }) => {
            return (
              <div>
                {canEditPages &&
                  verifiedToken === false && (
                    <ErrorNotification error={error} />
                  )}
                <br />
                {canEditPages && (
                  <ToolbarNav>
                    <Flex>
                      <Box>
                        <TextInfo>
                          <strong>
                            <FontAwesome name="user" />{" "}
                            {fetchedUserData.getFullName()}
                          </strong>{" "}
                          edited {timeSince(updated_at)} ago
                        </TextInfo>
                      </Box>
                      <Box ml="auto">
                        <Label>{fetchedUserData.getRoles()}</Label> &nbsp;
                        {loggedInUser.canOverwrite(fetchedUserData.getId()) &&
                          verifiedToken && (
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
            <PageEditor page={this.props.page} readOnly={true} />
          </Box>
        </Flex>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const loggedInUser = new AuthenticatedUser(state.auth.user)
  return {
    loggedInUser: loggedInUser,
  }
}

export default connect(mapStateToProps, { editPage, fetchUserInfo })(
  ExplorePageView,
)
