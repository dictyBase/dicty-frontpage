## Editor folder structure

_/editor_ - main folder containing all editor features

- this root directory contains the `PageEditor` component, the heart of the editor
- `PageEditor` contains the main logic of the editor (`value`, `onChange`) and passes them to the toolbar and Slate `Editor` components
- `PageEditor` also maintains the `plugins` array and imports the`renderMark` and `renderNode` functions for easy identification as to what is going inside the editor

_/editor/data_ - any placeholder json files go here

_/editor/flow_ - contains all reusable Flow type checking for the editor

_/editor/plugins_ - this is the home of all of our plugins

- each plugin has its own file (i.e. `bold.js`, `italic.js`, etc.)
- each plugin file contains all of the logic related to that feature
- generally, this file consists of three exports (using `bold` as example):
  1. `BoldPlugin` - the exported nested function that is implemented into the editor's `plugins` array
  2. `BoldMark` - the React component that handles rendering (needs to be placed into `renderMark` for use in the editor)
  3. `BoldButton` - the React component that displays a button and uses a click handler to connect to the editor (used in our toolbar)
- any variations of a specific plugin will be placed into nested folders (i.e. for categorized video upload, `plugins/video/youtube.js plugins/video/vimeo.js`)

_/editor/renderers_ - contains `renderMark` and `renderNode` functions that are passed to editor

_/editor/schema_ - contains any [schema](https://docs.slatejs.org/guides/schemas) used for the editor

_/editor/toolbar_ - everything related to the toolbar

- at minimum, this has the `EditorToolbar` component and generic `ToolbarButton` component

_/editor/utils_ - any type of helper functions specific to the editor
