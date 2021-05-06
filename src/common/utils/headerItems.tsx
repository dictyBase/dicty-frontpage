import React from "react"
import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import FileDownloadIcon from "@material-ui/icons/GetApp"
import InfoIcon from "@material-ui/icons/Info"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import LoginIcon from "common/icons/LoginIcon"
import LogoutIcon from "common/icons/LogoutIcon"

type LinkIconProps = {
  link: LinkProps
}

type LinkProps = {
  isRouter?: boolean
  text: string
  icon: React.ReactElement<SvgIconProps>
  url: string
}

const LinkIcon = ({ link }: LinkIconProps) => (
  <div style={{ textAlign: "center" }}>
    {link.icon}
    <br />
    {link.text}
  </div>
)

const HeaderLinks = ({ items }: { items: LinkProps[] }) => {
  return (
    <React.Fragment>
      {items.map((link: LinkProps, i: number) =>
        link.isRouter ? (
          <Link style={{ padding: "15px" }} key={i} to={link.url}>
            <LinkIcon link={link} />
          </Link>
        ) : (
          <HeaderLink key={i} href={link.url}>
            <LinkIcon link={link} />
          </HeaderLink>
        ),
      )}
    </React.Fragment>
  )
}

const headerItems = [
  {
    url: "/community/citation",
    icon: <AddIcon fontSize="large" />,
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: <FileDownloadIcon fontSize="large" />,
    text: "Downloads",
  },
  {
    url: "/about",
    icon: <InfoIcon fontSize="large" />,
    text: "About dictyBase",
  },
  {
    url: "/login",
    icon: <LoginIcon fontSize="large" />,
    text: "Login",
    isRouter: true,
  },
]

const loggedHeaderItems = [
  {
    url: "/community/citation",
    icon: <AddIcon fontSize="large" />,
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: <FileDownloadIcon fontSize="large" />,
    text: "Downloads",
  },
  {
    url: "/about",
    icon: <InfoIcon fontSize="large" />,
    text: "About dictyBase",
  },
  {
    url: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    text: "Logout",
    isRouter: true,
  },
]

export { headerItems, loggedHeaderItems, HeaderLinks }
