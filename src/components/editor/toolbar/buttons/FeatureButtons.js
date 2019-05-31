// @flow
import React from "react"
import { ImageButton } from "components/editor/plugins/image"
import { LinkButton } from "components/editor/plugins/link"
import { InsertInitialTableButton } from "components/editor/plugins/table"
import { VideoButton } from "components/editor/plugins/video"

const FeatureButtons = props => {
  const { showTableOptions, setShowTableOptions, ...other } = props

  return (
    <>
      <LinkButton {...other} />
      <InsertInitialTableButton
        showTableOptions={showTableOptions}
        setShowTableOptions={setShowTableOptions}
        {...props}
        onClick={() => {
          setShowTableOptions(true)
        }}
      />
      <ImageButton {...other} />
      <VideoButton {...other} />
    </>
  )
}

export default FeatureButtons
