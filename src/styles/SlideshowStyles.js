import styled from "styled-components"

export const SlideshowContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 440px;
  overflow: auto; */
`

export const ImageDiv = styled.div`
  height: 440px;

  @media (max-width: 768px) {
    height: 250px;
  }
`

export const ImageSizer = styled.img`
  height: 100%;
  width: 100%;
  max-height: 100%;
`

export const Legend = styled.p`
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -45%;
  width: 90%;
  border-radius: 10px;
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: 12px;
  text-align: center;
  opacity: 0.25;
  -webkit-transition: opacity 0.35s ease-in-out;
  -moz-transition: opacity 0.35s ease-in-out;
  -ms-transition: opacity 0.35s ease-in-out;
  -o-transition: opacity 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`
