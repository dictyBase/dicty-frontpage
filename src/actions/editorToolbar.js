import {
  CHANGE_FONT_SELECT,
  CHANGE_FONT_SIZE,
  CHANGE_FONT_COLOR,
  SHOW_HELP_MODAL,
  SHOW_COLOR_PICKER,
} from "constants/types"

export const changeFontSelect = (font: string) => ({
  type: CHANGE_FONT_SELECT,
  payload: {
    font,
  },
})

export const changeFontSize = (fontSize: string) => ({
  type: CHANGE_FONT_SIZE,
  payload: {
    fontSize,
  },
})

export const changeFontColor = (fontColor: string) => ({
  type: CHANGE_FONT_COLOR,
  payload: {
    fontColor,
  },
})

export const showHelpModal = (bool: boolean) => ({
  type: SHOW_HELP_MODAL,
  payload: {
    bool,
  },
})

export const showColorPicker = (bool: boolean) => ({
  type: SHOW_COLOR_PICKER,
  payload: {
    bool,
  },
})
