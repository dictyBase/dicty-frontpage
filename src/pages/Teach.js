// @flow
import React from "react"
import { Flex, Box } from "grid-styled"
import styled from "styled-components"
import logoTeaching from "../Components/images/logoTeaching.png"
import {teachdicty, davidk} from "../data/teachdicty"
import communityimg from "../Components/images/learn/rpL11-gfpBS.jpg"
import focusimg from "../Components/images/learn/gerisch4.png"
import techniqueimg1 from "../Components/images/learn/pst0fingersS.jpg"
import techniqueimg2 from "../Components/images/learn/HTP_princeton.png"
import techniqueimg3 from "../Components/images/learn/nullatt.png"


import {
  ListBox,
  Link,
  ListItems
} from "../Components/styles"

import{
    Banner, Header, Container, LearnList, SectionBox, TopLink, SectionImgLeft, SectionImgRight, LastUpdated, LearnLink, CourseItems, BannerText, BannerSubText, SectionSubText
} from "../Components/styles/learn_teach_styles"



const Teach = () => {
    const contentlist = teachdicty.map((section, index) =>
                <LearnLink key={index} href={section.href}>
                    <ListItems key={index}>
                        <LearnList>{section.title}</LearnList>
                    </ListItems>
                </LearnLink>   
            )

    const sectionlist = davidk.map((item, index) =>
            <CourseItems key={index}>
                {item.title}
                <Link key={index} href={item.href}>{item.linktxt}</Link>   
            </CourseItems>
    )            

    return( 
        <Flex wrap>
            <Banner>   
                <Header>Teaching Tools</Header>
                <p>using <em>Dictyostelium discoideum</em></p>                
                <img src={logoTeaching} alt="logo"/>
            </Banner>
            <Container>
                <Flex justify="center">
                    <Box width={2/3}>
                        <BannerText>
                            <em>Dictyostelium discoideum</em> is a great organism to use to teach cellular biology. It exhibits very interesting behaviors, such as chemotaxis and phagocytosis, that can readily be studied in standard laboratories without the need for expensive equipment.
                        </BannerText>
                    </Box>
                </Flex>
                <Flex justify="center">
                    <Box width={2/3}>
                        <BannerSubText>
                        The following are lists of labs being used in real courses settings and provide all necessary information for performing those experiments.
                        </BannerSubText>

                    </Box>
                </Flex>                
                <Flex justify="center">
                    <Box width={[1, 1/2]}>
                        <ListBox>
                            {contentlist}
                        </ListBox>
                    </Box>
                </Flex>
                <Flex justify="center">
                    <SectionBox id="davidk" width={2/3}>
                        <h3>Dictyostelium cell biology course</h3>
                        <SectionSubText>
                            <Link>by Dr.David Knecht</Link>
                        </SectionSubText>
                        <SectionSubText>
                            University of Connecticut
                        </SectionSubText>
                        <ListBox>
                            {sectionlist}
                        </ListBox>
                        <Link href="#"><TopLink>Top</TopLink></Link>
                    </SectionBox>
                </Flex>    
                                                  
            </Container>
        </Flex>
    )

}

export default Teach