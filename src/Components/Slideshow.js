import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100px;
`
const Carousel = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    transform: translate3d(${ props => props.activeIndex * (-100 / props.length) }%, 0, 0);
    transition: transform 0.3s ease;
    width: 100%;
    height: 100%;
`
const ImageContainer = styled.div`
    width: 100%;
`
const Slide = styled.img`
    width: 100%;
`
export default class Slideshow extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0
        }
    }
    next = () => {
        const { images } = this.props
        const { activeIndex } = this.state
        if (activeIndex == images.length - 1) {
            this.setState({
                activeIndex: 0
            })
        } else {
            this.setState({
                activeIndex: activeIndex + 1
            })
        }
    }
    renderImages = () => {
        const { images } = this.props
        return images.map((image, i) => {
            return (
                <ImageContainer key={ i } onClick={ this.next }>
                    <Slide src={ image } />
                </ImageContainer>
            )
        })
    }
    render() {
        const { images } = this.props
        const { activeIndex } = this.state
        return (
            <Container>
                <Carousel length={ images.length } activeIndex={ activeIndex }>
                    { this.renderImages() }
                </Carousel>
            </Container>
        )
    }
}
