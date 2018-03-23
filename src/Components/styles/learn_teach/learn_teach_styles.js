import styled from "styled-components"
import { Box } from "rebass"

export const Banner = styled.div`
  font-family: inherit;
  min-height: 150px;
  text-align: center;
  padding: 48px 30px 48px 30px;
  width: 100%;
  font-size: 12px;
  color: #333;
`

export const Header = styled.h1`
  @media (min-width: 768px) {
    font-size: 63px;
    padding: 2px;
    margin: 2px;
    font-weight: 500;
  }
`
export const Container = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  color: #555;
  padding: 0 15px 0 15px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`
export const LearnList = styled.p`
  padding: 10px 15px;
  border: 1px solid #ddd;
  font-size: 18px;
  line-height: 1.1;
  text-align: center;
`

export const ContentLink = styled.a`
  text-decoration: none;
  color: inherit;
`

export const SectionBox = styled(Box)`
  border-top: 1px solid #ddd;
`

export const TopLink = styled.p`
  font-size: small;
  text-align: center;
`

export const SectionImgLeft = styled.img`
  float: left;
  width: 120px;
  height: auto;
  margin: 5px 20px 5px 0;
  border: 3px solid #000;
`

export const SectionImgRight = styled.img`
  float: Right;
  width: 120px;
  height: auto;
  margin: 5px 0px 5px 20px;
  border: 3px solid #000;
`

export const LastUpdated = styled.p`
  text-align: center;
`

export const CourseItems = styled.li`
  padding-bottom: 10px;
  font-size: 16px;
`

export const BannerText = styled.p`
  font-size: 18px;
  text-align: center;
`

export const BannerSubText = styled.p`
  font-size: 12px;
  text-align: center;
`

export const SectionSubText = styled.p`
  font-size: 14px;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 0;
`

export const DownldBtn = styled.a`
  text-decoration: none;
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
  padding: 5px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  text-align: center;
  margin-left: 5px;
`
