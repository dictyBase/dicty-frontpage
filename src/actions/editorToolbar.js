import {
  CHANGE_FONT_SELECT,
  CHANGE_FONT_SIZE,
  SHOW_HELP_MODAL,
  SHOW_COLOR_PICKER,
  SHOW_TABLE_OPTIONS,
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

export const showTableOptions = (bool: boolean) => ({
  type: SHOW_TABLE_OPTIONS,
  payload: {
    bool,
  },
})
