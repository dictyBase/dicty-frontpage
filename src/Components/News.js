import React from 'react'
import styled from 'styled-components'
import twitterLogo from './images/twitterLogo.png'

const Container = styled.div`
	text-align: left;
	padding-left: 10px;
	padding-right: 10px;
  min-height: 600px;
  background-color: #F2F2F2;
`

const Header = styled.div`
	color:black;
	font-size: 20px;
	padding: 15px 30px 10px 30px;
	vertical-align:top;
	text-align: right;
`

const Logo = styled.div`
	float: left;
`

const Img = styled.img`
	width: 25px;
`

const newsBox = styled.div`
	//padding: 0px 30px 8px 30px;
	padding: 0px 25px 10px 35px;
	font-size: 8px;
`

const newsMore = styled.div`
	color: #0B3861;
	font-size: 11px;
	font-style: italic;
	font-weight: normal;
	text-align: center;
	padding-top: 5px;
	padding-bottom: 15px;
`
/*
const newsDate = styled.div`
	color: #0B3861;
	padding-right: 10px;
`
*/

const News = (props) => {
			 const text = props.posts.map((post)=>
					<ul key= {post.id}>
						<li>
								{post.date}
								{post.source}
								{post.content}
						</li>
					</ul>
				);
        return (
					<Container>
						<Header>
							<p>DICTY NEWS</p>
							<Logo>
								<Img src={ twitterLogo } />
							</Logo>
						</Header>
						<newsBox>
							{text}
						</newsBox>
						<newsMore>
							<a href="" alt= "more news"> more news </a>
						</newsMore>
					</Container>
        );
    }

export default News;
