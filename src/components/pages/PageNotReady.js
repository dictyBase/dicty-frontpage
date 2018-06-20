// @flow
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import FontAwesome from "react-fontawesome"
import Jumbotron from "styles/Jumbotron"
import { Container } from "styles/learn_teach/learn_teach_styles"

const ConstructionContainer = styled(Container)`
  margin-top: 20px;
`

const HomeLink = styled(Link)`
  text-decoration: none;
`

/**
 * General 404 error page, currently designated as "Page Not Ready"/"Under Construction"
 */

const PageNotReady = () => {
  return (
    <ConstructionContainer>
      <Jumbotron>
        <h1>
          <FontAwesome name="wrench" /> Under Construction
        </h1>
        <p>This page is not ready yet.</p>

        <HomeLink to="/">Dictybase Home</HomeLink>
      </Jumbotron>
    </ConstructionContainer>
  )
}

export default PageNotReady
