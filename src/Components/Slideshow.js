import React, { Component } from 'react'
import styled from 'styled-components'

const Carousel = styled.div`
    display: flex;
    flex-direction: row;
`
const ImageContainer = styled.div`

`
const Slide = styled.img`
    width: 100%;
`
export default class Slideshow extends Component {
    renderImages = () => {
        const { images } = this.props
        return images.map((image) => {
            return (
                <ImageContainer>
                    <Slide src={ image } />
                </ImageContainer>
            )
        })
    }
    render() {
        return (
            <Carousel>
                { this.renderImages() }
            </Carousel>
        )
    }
}
