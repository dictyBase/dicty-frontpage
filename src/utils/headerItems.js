// @flow
import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import React from "react"
import FontAwesome from "react-fontawesome"

const generateLinks = (link: Object, i: string) => {
  return link.isRouter ? (
    <Link key={i} to={link.url}>
      <FontAwesome name={link.icon} />&nbsp;
      {link.text}
    </Link>
  ) : (
    <HeaderLink key={i} href={link.url}>
      <FontAwesome name={link.icon} />&nbsp;
      {link.text}
    </HeaderLink>
  )
}

const headerItems = [
  {
    url: "/cite",
    icon: "plus",
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
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
    url: "/cite",
    icon: "plus",
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
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
