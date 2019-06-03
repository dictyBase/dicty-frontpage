# [4.1.0](https://github.com/dictyBase/dicty-frontpage/compare/4.0.1...4.1.0) (2019-06-03)


### Bug Fixes

* **deserializer:** add additional check to get all list item descendents on paste ([3331825](https://github.com/dictyBase/dicty-frontpage/commit/3331825)), closes [#148](https://github.com/dictyBase/dicty-frontpage/issues/148)


### Features

* use more appropriate page titles for info subpages ([142e7de](https://github.com/dictyBase/dicty-frontpage/commit/142e7de)), closes [#134](https://github.com/dictyBase/dicty-frontpage/issues/134)

## [4.0.1](https://github.com/dictyBase/dicty-frontpage/compare/4.0.0...4.0.1) (2019-05-29)


### Bug Fixes

* remove error page flickering when new page added ([7b56ac7](https://github.com/dictyBase/dicty-frontpage/commit/7b56ac7)), closes [#119](https://github.com/dictyBase/dicty-frontpage/issues/119)

# [4.0.0](https://github.com/dictyBase/dicty-frontpage/compare/3.0.0...4.0.0) (2019-05-29)


### Bug Fixes

* lower width of homepage on xl resolutions ([6905691](https://github.com/dictyBase/dicty-frontpage/commit/6905691)), closes [#123](https://github.com/dictyBase/dicty-frontpage/issues/123)


### Features

* **link:** add checkbox for creating email links ([867911a](https://github.com/dictyBase/dicty-frontpage/commit/867911a)), closes [#144](https://github.com/dictyBase/dicty-frontpage/issues/144)
* **link:** update link modal to prefill text and URL data if selected ([00a3a0c](https://github.com/dictyBase/dicty-frontpage/commit/00a3a0c)), closes [#143](https://github.com/dictyBase/dicty-frontpage/issues/143)
* replace dictyNews with twitter feed ([08e2f84](https://github.com/dictyBase/dicty-frontpage/commit/08e2f84)), closes [#91](https://github.com/dictyBase/dicty-frontpage/issues/91)
* update latest papers ([6445cad](https://github.com/dictyBase/dicty-frontpage/commit/6445cad))


### BREAKING CHANGES

* this changes the design of the front page

# [3.0.0](https://github.com/dictyBase/dicty-frontpage/compare/2.5.0...3.0.0) (2019-05-24)


### Bug Fixes

* allow video links to be pasted in ([06b44d4](https://github.com/dictyBase/dicty-frontpage/commit/06b44d4))
* fix bug where images were not being added on paste ([5db1a0b](https://github.com/dictyBase/dicty-frontpage/commit/5db1a0b)), closes [#117](https://github.com/dictyBase/dicty-frontpage/issues/117)
* fix bug where links were not getting pasted in correctly ([7185473](https://github.com/dictyBase/dicty-frontpage/commit/7185473)), closes [#117](https://github.com/dictyBase/dicty-frontpage/issues/117)


### Features

* add buttons to increase/decrease list item identation ([034aa6a](https://github.com/dictyBase/dicty-frontpage/commit/034aa6a)), closes [#133](https://github.com/dictyBase/dicty-frontpage/issues/133)
* add dockerfile for ericdev ([88bb4fd](https://github.com/dictyBase/dicty-frontpage/commit/88bb4fd))
* add function to parse pasted html, fixing issue where content would be missing ([f86e0e0](https://github.com/dictyBase/dicty-frontpage/commit/f86e0e0)), closes [#117](https://github.com/dictyBase/dicty-frontpage/issues/117)
* add link to upload images in help modal ([9d45cd1](https://github.com/dictyBase/dicty-frontpage/commit/9d45cd1))
* add separators to toolbar, make buttons slightly smaller ([d53a5bf](https://github.com/dictyBase/dicty-frontpage/commit/d53a5bf))
* display the actual font families and sizes inside the toolbar dropdowns ([9a678d7](https://github.com/dictyBase/dicty-frontpage/commit/9a678d7))
* implement new list plugin ([9734eb4](https://github.com/dictyBase/dicty-frontpage/commit/9734eb4)), closes [#133](https://github.com/dictyBase/dicty-frontpage/issues/133)
* implement new table plugin ([9e4d8a8](https://github.com/dictyBase/dicty-frontpage/commit/9e4d8a8)), closes [#117](https://github.com/dictyBase/dicty-frontpage/issues/117)


### BREAKING CHANGES

* this changes the behavior of pasting HTML, removing links in favor of allowing for
lists, tables, etc

# [2.5.0](https://github.com/dictyBase/dicty-frontpage/compare/2.4.0...2.5.0) (2019-05-17)


### Bug Fixes

* clean up material-ui console warnings ([7e03b23](https://github.com/dictyBase/dicty-frontpage/commit/7e03b23))
* enable toggling of headers ([580f03a](https://github.com/dictyBase/dicty-frontpage/commit/580f03a)), closes [#136](https://github.com/dictyBase/dicty-frontpage/issues/136)
* remove any errors on successful login ([8bc6176](https://github.com/dictyBase/dicty-frontpage/commit/8bc6176))
* remove word-break styling from table cells ([752ea12](https://github.com/dictyBase/dicty-frontpage/commit/752ea12)), closes [#130](https://github.com/dictyBase/dicty-frontpage/issues/130)
* update alignment so only justify uses normal white-space css ([fe1452e](https://github.com/dictyBase/dicty-frontpage/commit/fe1452e))


### Features

* add custom link modal for page editor ([3078eb3](https://github.com/dictyBase/dicty-frontpage/commit/3078eb3)), closes [#101](https://github.com/dictyBase/dicty-frontpage/issues/101)
* add custom modal for images that accepts height/width/description ([3b49858](https://github.com/dictyBase/dicty-frontpage/commit/3b49858)), closes [#125](https://github.com/dictyBase/dicty-frontpage/issues/125)
* add custom modal for videos that accepts url/height/width ([fd93f15](https://github.com/dictyBase/dicty-frontpage/commit/fd93f15)), closes [#101](https://github.com/dictyBase/dicty-frontpage/issues/101)
* add justify alignment button to editor toolbar ([302dc4f](https://github.com/dictyBase/dicty-frontpage/commit/302dc4f)), closes [#127](https://github.com/dictyBase/dicty-frontpage/issues/127)
* add line spacing button to editor toolbar ([c3d91ac](https://github.com/dictyBase/dicty-frontpage/commit/c3d91ac)), closes [#128](https://github.com/dictyBase/dicty-frontpage/issues/128)
* add subscript button to editor toolbar ([14d39ec](https://github.com/dictyBase/dicty-frontpage/commit/14d39ec)), closes [#122](https://github.com/dictyBase/dicty-frontpage/issues/122)
* add superscript button to editor toolbar ([e0ae45d](https://github.com/dictyBase/dicty-frontpage/commit/e0ae45d)), closes [#122](https://github.com/dictyBase/dicty-frontpage/issues/122)
* replace standard <hr> tag with material-ui divider ([b6ff285](https://github.com/dictyBase/dicty-frontpage/commit/b6ff285))
* update editor help modal to show keyboard shortcuts ([4dd26fd](https://github.com/dictyBase/dicty-frontpage/commit/4dd26fd)), closes [#138](https://github.com/dictyBase/dicty-frontpage/issues/138)

# [2.4.0](https://github.com/dictyBase/dicty-frontpage/compare/2.3.1...2.4.0) (2019-05-03)


### Bug Fixes

* add short timeout when user saves new page ([e265670](https://github.com/dictyBase/dicty-frontpage/commit/e265670)), closes [#116](https://github.com/dictyBase/dicty-frontpage/issues/116)
* clean up linting issues ([f7f278b](https://github.com/dictyBase/dicty-frontpage/commit/f7f278b))
* fix bug where users couldn't edit newly created subpath pages ([a438e3f](https://github.com/dictyBase/dicty-frontpage/commit/a438e3f))
* fix material-ui console warning ([ba03e40](https://github.com/dictyBase/dicty-frontpage/commit/ba03e40))
* set default editor link behavior to open in same tab ([edb07b9](https://github.com/dictyBase/dicty-frontpage/commit/edb07b9))
* use absolute positioning for color picker ([b90ce91](https://github.com/dictyBase/dicty-frontpage/commit/b90ce91)), closes [#99](https://github.com/dictyBase/dicty-frontpage/issues/99)
* use appropriate redirect path if user cancels new page creation ([556036b](https://github.com/dictyBase/dicty-frontpage/commit/556036b))


### Features

* add font color picker to toolbar ([2bd6f6d](https://github.com/dictyBase/dicty-frontpage/commit/2bd6f6d)), closes [#99](https://github.com/dictyBase/dicty-frontpage/issues/99)
* add more font options to the editor toolbar ([d5ef5c0](https://github.com/dictyBase/dicty-frontpage/commit/d5ef5c0)), closes [#103](https://github.com/dictyBase/dicty-frontpage/issues/103)
* add new table icon to toolbar that toggles other table buttons ([f3a9f34](https://github.com/dictyBase/dicty-frontpage/commit/f3a9f34)), closes [#102](https://github.com/dictyBase/dicty-frontpage/issues/102)
* add option for authorized users to create page if route doesn't exist ([cc2bd41](https://github.com/dictyBase/dicty-frontpage/commit/cc2bd41)), closes [#74](https://github.com/dictyBase/dicty-frontpage/issues/74) [#82](https://github.com/dictyBase/dicty-frontpage/issues/82)
* add react-helmet to provide titles for individual pages ([8a9ef8a](https://github.com/dictyBase/dicty-frontpage/commit/8a9ef8a)), closes [#107](https://github.com/dictyBase/dicty-frontpage/issues/107)
* add save button to editor toolbar ([834864e](https://github.com/dictyBase/dicty-frontpage/commit/834864e)), closes [#111](https://github.com/dictyBase/dicty-frontpage/issues/111)
* update polyfills to only use what is needed for IE11 ([d40cde3](https://github.com/dictyBase/dicty-frontpage/commit/d40cde3))
* update text color and line spacing on editable pages ([c149a34](https://github.com/dictyBase/dicty-frontpage/commit/c149a34)), closes [#104](https://github.com/dictyBase/dicty-frontpage/issues/104)

## [2.3.1](https://github.com/dictyBase/dicty-frontpage/compare/2.3.0...2.3.1) (2018-12-03)


### Bug Fixes

* make credits more readable on frontpage slideshow ([3e18ddf](https://github.com/dictyBase/dicty-frontpage/commit/3e18ddf)), closes [#108](https://github.com/dictyBase/dicty-frontpage/issues/108)
* remove console warning caused by HOC action ([6f2e4a5](https://github.com/dictyBase/dicty-frontpage/commit/6f2e4a5))

# [2.3.0](https://github.com/dictyBase/dicty-frontpage/compare/2.2.1...2.3.0) (2018-10-19)


### Features

* update color scheme for navbar ([aa988e4](https://github.com/dictyBase/dicty-frontpage/commit/aa988e4)), closes [#106](https://github.com/dictyBase/dicty-frontpage/issues/106)
