import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

type LinkIconProps = {
  link: LinkProps
}

type LinkProps = {
  isRouter?: boolean
  text: string
  icon: IconProp
  url: string
}

const LinkIcon = ({ link }: LinkIconProps) => (
  <div style={{ textAlign: "center" }}>
    <FontAwesomeIcon icon={link.icon} size="2x" />
    <br />
    {link.text}
  </div>
)

const generateLinks = (link: LinkProps, i: number) =>
  link.isRouter ? (
    <Link style={{ padding: "15px" }} key={i} to={link.url}>
      <LinkIcon link={link} />
    </Link>
  ) : (
    <HeaderLink key={i} href={link.url}>
      <LinkIcon link={link} />
    </HeaderLink>
  )

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
  },
  {
    url: "/login",
    icon: "sign-in-alt",
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
  },
  {
    url: "/logout",
    icon: "sign-out-alt",
    text: "Logout",
    isRouter: true,
  },
]

export { headerItems, loggedHeaderItems, generateLinks }
