import React, { Component } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import Skeleton from "react-loading-skeleton"
import FontAwesome from "react-fontawesome"
import InlineEditor from "components/editor/InlineEditor"
import { fetchPage } from "actions/editablePages"
import { ListItems, MainContent } from "styles"

class NewsItem extends Component {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }

  componentDidMount() {
    this.props.fetchPage(this.props.slug)
  }

  render() {
    const { isFetching, page } = this.props
    console.log(page)
    if (!isFetching && page.data.attributes.content) {
      return (
        <Flex justify="center">
          <Box w={"95%"}>
            <ListItems>
              <MainContent>
                <InlineEditor auth={this.props.auth} page={this.props.page} />
              </MainContent>
            </ListItems>
          </Box>
          <Box>
            <FontAwesome
              name="pencil"
              title="Edit news item"
              style={{ color: "blue" }}
            />
            &nbsp;
            <FontAwesome
              name="trash"
              title="Delete news item"
              style={{ color: "red" }}
            />
          </Box>
        </Flex>
      )
    }
    return (
      <Flex justify="center">
        <Box w={"95%"}>
          <Skeleton count={3} />
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = ownProps.slug
  return {
    auth: state.auth,
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(NewsItem)
