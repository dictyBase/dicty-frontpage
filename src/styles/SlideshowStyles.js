import styled from "styled-components"

export const SlideshowContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
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
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -45%;
  width: 90%;
  border-radius: 10px;
  background: rgba(51, 51, 51, 0.8);
  color: #fff;
  padding: 10px;
  font-size: 12px;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`
