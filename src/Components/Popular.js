// @flow
import React from "react"
import { Flex } from "grid-styled"

import {
  PopularHeader,
  WidgetListBox,
  ListItems,
  WidgetLink,
  WidgetImg,
} from "./styles"

const Popular = (props: {
  /** List of widget items */
  widgets: Array<{
    "link": string,
    "image": any,
    "alt": string,
  }>,
}) => {
  const widgetlist = props.widgets.map((widget, index) =>
    <ListItems key={index}>
        <WidgetLink
              href={widget.link}
              alt={widget.alt}>
              <WidgetImg src={widget.image} />
        </WidgetLink>
    </ListItems>,
  )

  return (
    <Flex wrap>
      <PopularHeader>
            Most popular tools and sections
      </PopularHeader>
      <WidgetListBox>
        {widgetlist}
      </WidgetListBox>
    </Flex>
  )
}

export default Popular
