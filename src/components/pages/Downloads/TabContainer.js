import React from "react"
import Typography from "@material-ui/core/Typography"

type Props = {
  children: any,
}

const TabContainer = (props: Props) => (
  <Typography component="div">{props.children}</Typography>
)

export default TabContainer
