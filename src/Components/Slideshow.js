import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: ${ props => props.theme.background ? props.theme.background : 'black' };
    margin: ${ props => props.theme.margin ? props.theme.margin : '20px' };
`
const Carousel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    transform: translate3d(${ props => props.activeIndex * (-100) }%, 0, 0);
    transition: transform 0.4s ease;
    width: 100%;
    height: 100%;
`
const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
`
const Slide = styled.img`
    ${'' /* object-fit: contain;
    max-width: 100%; */}
    height: 100%;
    ${'' /* width: ${ props => (props.length + 1) * 100 }%; */}
`
const Button = styled.i`
    cursor: pointer;
    height: 20px;
    width: 20px;
    color: white;
    opacity: 0.7;
    position: absolute;
    ${ props => props.side === 'left' && 'left: 15px;' }
    ${ props => props.side === 'right' && 'right: 15px;' }
    margin: auto 0;
    z-index: 100;
    top: 0;
    bottom: 0;
    transition: opacity .15s ease;

    &:hover {
        opacity: 1;
    }
`
const Dots = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 20px;
    cursor: pointer;
`
const Dot = styled.i`
    color: white;
    opacity: ${ props => props.active ? 1 : 0.7 };
    transition: opacity 0.15s ease;
    z-index: 100;
    width: 20px;
`
export default class Slideshow extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0,
            intervalId: null
        }
    }
    componentDidMount() {
        this.start()
    }
    next = () => {
        const { images } = this.props
        const { activeIndex } = this.state
        this.setState({
            activeIndex: activeIndex === images.length - 1 ? 0 : activeIndex + 1
        })
    }
    previous = () => {
        const { images } = this.props
        const { activeIndex } = this.state
        this.setState({
            activeIndex: activeIndex === 0 ? images.length - 1 : activeIndex - 1
        })
    }
    renderImages = () => {
        const { images } = this.props
        return images.map((image, i) => {
            return (
                <ImageContainer key={ i }>
                    <Slide length={ images.length } src={ image } />
                </ImageContainer>
            )
        })
    }
    renderDots = () => {
        const { images } = this.props
        const { activeIndex } = this.state
        return images.map((image, i) => {
            return (
                <Dot key={ i }
                    className={ `fa fa-circle${ i !== activeIndex ? '-thin' : '' }` }
                    aria-hidden="true" active={ activeIndex === i && true }
                    onClick={ () => { this.setSlide(i) } }
                />
            )
        })
    }
    start = () => {
        const { time } = this.props
        const intervalId = setInterval(() => {
            this.next()
        }, this.props.time ? this.props.time : 20000)
        this.setState({
            intervalId
        })
    }
    stop = () => {
        clearInterval(this.state.intervalId)
    }
    setSlide = (i) => {
        this.stop()
        this.setState({
            activeIndex: i
        })
        this.start()
    }
    render() {
        const { images } = this.props
        const { activeIndex } = this.state
        return (
            <Container>
                <Button className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={ this.previous } side="left" />
                <Carousel length={ images.length } activeIndex={ activeIndex }>
                    { this.renderImages() }
                </Carousel>
                <Button className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={ this.next } side="right" />
                <Dots>
                    { this.renderDots() }
                </Dots>
            </Container>
        )
    }
}
