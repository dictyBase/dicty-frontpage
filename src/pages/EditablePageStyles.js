import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;

  @media (max-width: 767px) {
    flex-wrap: wrap;
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
    @media (min-width: 768px) {
        font-size: 63px;
        padding: 2px;
        margin: 2px;
    }
`

export const Hdrtxt = styled.p`
    font-size: 21px;
`

export const ToolBar = styled.div`
    position: relative;
    padding: 1px 18px 17px;
    margin: 0 -20px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
`

export const Button = styled.span`
    color: #000;
    cursor: pointer;
    padding: 10px;

`
