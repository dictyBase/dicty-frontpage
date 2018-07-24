// @flow
import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import React from "react"
import FontAwesome from "react-fontawesome"
import styled from "styled-components"
import "font-awesome/css/font-awesome.min.css"

const RouterLink = styled(Link)`
  color: #15317e;
  padding: 15px;
  text-decoration: none;
`

const generateLinks = (link: Object, i: string) => {
  return link.isRouter ? (
    <RouterLink key={i} to={link.url}>
      <center>
        <FontAwesome name={link.icon} size="2x" />
        <br />
        {link.text}
      </center>
    </RouterLink>
  ) : (
    <HeaderLink key={i} href={link.url}>
      <center>
        <FontAwesome name={link.icon} size="2x" />
        <br />
        {link.text}
      </center>
    </HeaderLink>
  )
}

const headerItems = [
  {
    url: "/community/citation",
    icon: "plus",
    text: "Cite Us",
    isRouter: true,
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
    isRouter: true,
  },
  {
    url: "/about",
    icon: "info-circle",
    text: "About dictyBase",
    isRouter: true,
  },
  {
    url: "/login",
    icon: "sign-in",
    text: "Login",
    isRouter: true,
  },
]

const loggedHeaderItems = [
  {
    url: "/community/citation",
    icon: "plus",
    text: "Cite Us",
    isRouter: true,
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
    isRouter: true,
  },
  {
    url: "/about",
    icon: "info-circle",
    text: "About dictyBase",
    isRouter: true,
  },
  {
    url: "/logout",
    icon: "sign-out",
    text: "Logout",
    isRouter: true,
  },
]

export { headerItems, loggedHeaderItems, generateLinks }
