// @flow
import React from "react"
import { Flex, Box } from "rebass"

import {
  PopularHeader,
  WidgetListBox,
  ListItems,
  WidgetLink,
  WidgetImg,
} from "styles"

/** Widget that displays the most popular tools and sections */

const Popular = (props: {
  /** List of widget items */
  widgets: Array<{
    link: string,
    image: any,
    alt: string,
  }>,
}) => {
  const widgetlist = props.widgets.map(
    (widget, index) =>
      widget.isRouter ? (
        <ListItems key={index}>
          <WidgetLink to={widget.link} alt={widget.alt}>
            <WidgetImg src={widget.image} alt={widget.alt} />
          </WidgetLink>
        </ListItems>
      ) : (
        <ListItems key={index}>
          <a href={widget.link} alt={widget.alt}>
            <WidgetImg src={widget.image} alt={widget.alt} />
          </a>
        </ListItems>
      ),
  )

  return (
    <Flex justify={"center"}>
      <Box>
        <PopularHeader>Most popular tools and sections</PopularHeader>
        <WidgetListBox>{widgetlist}</WidgetListBox>
      </Box>
    </Flex>
  )
}

export default Popular
