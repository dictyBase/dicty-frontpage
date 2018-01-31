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

export const Button = styled.button`
    color: #fff;
    background: #337ab7;
    border: none;
    font-size: 12px;
    border-radius: 3px;
    display: block;
    padding: 5px 10px;
    text-align: center;
    margin: 10px 20px 10px 0px;
    width: 100px;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
`
