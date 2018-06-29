import styled from "styled-components"
import { Box } from "rebass"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  line-height: 1.428;

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`

export const NewsEditorBox = styled(Box)`
  border-top: 2px solid #d1d5da;
  border-left: 2px solid #d1d5da;
  border-right: 2px solid #d1d5da;
  border-radius: 5px 5px 0px 0px;
  min-height: 200px;
`

export const NewsEditorButtonsBox = styled(Box)`
  border-left: 2px solid #d1d5da;
  border-right: 2px solid #d1d5da;
  border-bottom: 2px solid #d1d5da;
  border-radius: 0px 0px 5px 5px;
  padding: 5px;
`

export const EditorStyle = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 2px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: #fefefe;
  margin: 10px auto;
`

export const ToolBar = styled.div`
  position: relative;
  padding: 20px 18px 17px;
  border-bottom: 2px solid #d1d5da;
  /* margin-bottom: 20px; */
  background-color: #f1f8ff;
`

export const Button = styled.span`
  color: #586069;
  width: 50px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    color: #000;
  }
`

export const Item = styled.div`
  width: 50%;
  padding-left: 50px;
  padding-bottom: 50px;
  padding-right: 20px;

  @media (max-width: 767px) {
    padding-left: 50px;
    padding-bottom: 5px;
    padding-right: 50px;
    width: 100%;
  }
`

export const Banner = styled.div`
  min-height: 150px;
  text-align: center;
  padding: 48px 30px 48px 30px;
  background-color: #eee;
`

export const Header = styled.h1`
  background-color: #f2f2f2;
  @media (min-width: 768px) {
    font-size: 63px;
    padding: 2px;
    margin: 2px;
  }
`

export const Hdrtxt = styled.p`
  font-size: 21px;
`

export const NewsToolBar = styled.div`
  background-color: #f1f8ff;
  position: relative;
  padding: 5px 10px 5px;
  margin: 0 -20px;
`

export const DefaultButton = styled.button`
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
`

export const CancelButton = DefaultButton.extend`
  color: #333;
  background-color: #fff;
  border-color: #ccc;
  display: block;
  width: 100%;

  &:focus {
    color: #333;
    background-color: #e6e6e6;
    border-color: #8c8c8c;
  }

  &:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  &:active {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
`

export const SaveButton = DefaultButton.extend`
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  width: 100%;

  a {
    color: #fff;
  }

  a:hover {
    color: #fff;
    text-decoration: none;
  }

  &:focus {
    color: #fff;
    background-color: #286090;
    border-color: #122b40;
  }

  &:hover {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
  }

  &:active {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
  }
`

export const InlineLink = styled.a`
  cursor: pointer;
`

export const TextInfo = styled.span`
  color: #31708f;
  &:hover {
    color: #245269;
  }
  &:focus {
    color: #245269;
  }
`

export const ToolbarNav = styled.div`
  background-color: #fafafa;
  border-radius: 2px;
  border: 1px solid #ddd;
  padding: 5px;
  width: 100%;
  display: inline-block;
`

export const Label = styled.span`
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  background-color: #337ab7;
  &:hover {
    background-color: #337ab7;
  }
  &:focus {
    background-color: #337ab7;
  }
`

export const EditPanel = styled.div`
  /* border: 1px solid #ddd; */
  /* padding: 10px; */
  [contenteditable="true"]:focus {
    outline: none;
  }
`
