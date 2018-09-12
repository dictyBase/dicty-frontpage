import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import VideoIcon from "@material-ui/icons/Videocam"
import getVideoId from "get-video-id"

import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Material-UI styling
 */
const styles = theme => ({
  wrapper: {
    position: "relative",
    paddingBottom: "50.66%",
    paddingTop: "25px",
    height: "0",
    outline: "2px solid #0017ff",
  },
  iframe: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
  },
})

/**
 * Functions to set the video blocks.
 */
const insertVideo = (change, url) => {
  const videoId = getVideoId(url).id
  let src
  if (url.match(/youtube\.com/)) {
    src = `https://www.youtube.com/embed/${videoId}`
  } else if (url.match(/vimeo\.com/)) {
    src = `https://player.vimeo.com/video/${videoId}`
  } else {
    alert("Can only accept YouTube or Vimeo URL.")
    return
  }

  change.insertBlock({
    type: "video",
    isVoid: true,
    data: { src, url },
  })
}

const insertVideoStrategy = change => {
  const { value } = change
  const src = window.prompt("Enter the URL of the video (YouTube or Vimeo).")
  if (!src) return

  return value.change().call(insertVideo, src)
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const Video = ({ children, attributes, node: { data }, classes }) => {
  const src = data.get("src")

  return (
    <div {...attributes} className={classes.wrapper}>
      <iframe
        title="video-embed"
        id="ytplayer"
        type="text/html"
        width="580"
        height="390"
        src={src}
        frameBorder="0"
        className={classes.iframe}
      />
    </div>
  )
}

const VideoNode = withStyles(styles)(Video)

/**
 * Button components that use click handlers to connect to the editor.
 */
const VideoButton = ({ value, onChange }) => (
  <Tooltip title="video" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(insertVideoStrategy(value.change()))
      }}>
      <VideoIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for videos.
 * It accepts event and change as arguments.
 */
const VideoKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "m") return insertVideoStrategy(change)
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const VideoPlugin = options => ({
  onKeyDown(...args) {
    return VideoKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { VideoNode, VideoButton, VideoPlugin, insertVideo }
