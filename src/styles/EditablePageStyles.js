import styled from "styled-components"
import { Editor } from "slate-react"
import Button from "@material-ui/core/Button"

export const StyledEditor = styled(Editor)`
  padding: 15px;
  min-height: 200px;
  min-width: 800px;
  line-height: 1.6;
  color: "rgba(0, 0, 0, 0.87)";

  a {
    color: #428bca;
    text-decoration: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
  }

  table tr {
    border: none;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  table td {
    padding: 0.4rem 1.4rem 0.4rem 0.8rem;
    border: 1px solid #ccc;
    border-top: none;
    border-bottom: none;
    border-right: none;
    flex: 1;
    position: relative;
  }

  table td p {
    margin: 0;
  }
`

export const CancelButton = styled(Button)`
  && {
    width: 100%;
  }
`

export const SaveButton = styled(Button)`
  && {
    width: 100%;
    background-color: #15317e;
  }
`

export const EditorStyle = styled.div`
  border: 1px solid #ddd;
  cursor: text;
  border-radius: 2px;
  margin: 10px auto;
  padding-bottom: 5px;
`

export const Toolbar = styled.div`
  position: relative;
  padding: 20px 18px 17px;
  border-bottom: 2px solid #d1d5da;
  background-color: #f1f8ff;
`

export const ToolbarButton = styled.span`
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
  padding: 9px;
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
