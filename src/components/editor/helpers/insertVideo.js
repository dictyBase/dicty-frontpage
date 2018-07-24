import getVideoId from "get-video-id"
import BLOCKS from "components/editor/constants/blocks"

const insertVideo = (change, url) => {
  const videoId = getVideoId(url).id
  let src
  if (url.match(/youtube\.com/)) {
    src = `https://www.youtube.com/embed/${videoId}`
  } else if (url.match(/vimeo\.com/)) {
    src = `https://player.vimeo.com/video/${videoId}`
  } else {
    alert("Only accept Youtube or Vimeo url")
    return
  }

  change.insertBlock({
    type: BLOCKS.VIDEO,
    isVoid: true,
    data: { src, url },
  })
}

export default insertVideo
