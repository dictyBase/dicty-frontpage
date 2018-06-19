// @flow
import React from "react"
import { Flex, Box } from "rebass"
import logoTeaching from "images/logoTeaching.png"
import {
  teachdicty,
  davidk,
  derrickb,
  johnb,
  thierrys,
  references,
} from "data/teachdicty"

import { ListBox, Link, ListItems } from "styles"

import {
  Banner,
  Header,
  Container,
  LearnList,
  SectionBox,
  TopLink,
  ContentLink,
  CourseItems,
  BannerText,
  BannerSubText,
  SectionSubText,
  DownldBtn,
} from "styles/learn_teach/learn_teach_styles"

/** This component handles the "Teaching Protocols" subpage */

const Teach = () => {
  const contentlist = teachdicty.map((section, index) => (
    <ContentLink key={index} href={section.href}>
      <ListItems key={index}>
        <LearnList>{section.title}</LearnList>
      </ListItems>
    </ContentLink>
  ))

  const davidklist = davidk.map((item, index) => (
    <CourseItems key={index}>
      {item.title}
      <Link key={index} target="_new" href={item.href}>
        {item.linktxt}
      </Link>
    </CourseItems>
  ))

  const derrickblist = derrickb.map((item, index) => (
    <CourseItems key={index}>
      {item.title}
      <DownldBtn
        key={index}
        href={item.href}
        target="_self"
        download={item.doctitle}>
        Download
      </DownldBtn>
    </CourseItems>
  ))

  const thierryslist = thierrys.map((item, index) => (
    <CourseItems key={index}>
      {item.title}
      <DownldBtn
        key={index}
        href={item.href}
        target="_self"
        download={item.doctitle}>
        Download
      </DownldBtn>{" "}
      {item.linktxt ? (
        <span>
          {" "}
          - <Link href={item.href}>{item.linktxt}</Link>{" "}
        </span>
      ) : (
        ""
      )}
    </CourseItems>
  ))

  const referencelist = references.map((item, index) => (
    <CourseItems key={index}>
      <small>
        {item.text}
        {item.linktxt ? (
          <span>
            {" "}
            <Link target="_new" key={index} href={item.href}>
              {item.linktxt}
            </Link>{" "}
          </span>
        ) : (
          ""
        )}{" "}
      </small>
    </CourseItems>
  ))

  return (
    <Flex wrap>
      <Banner>
        <Header>Teaching Tools</Header>
        <p>
          using <em>Dictyostelium discoideum</em>
        </p>
        <img src={logoTeaching} alt="logo" />
      </Banner>
      <Container>
        <Flex justify="center">
          <Box width={2 / 3}>
            <BannerText>
              <em>Dictyostelium discoideum</em> is a great organism to use to
              teach cellular biology. It exhibits very interesting behaviors,
              such as chemotaxis and phagocytosis, that can readily be studied
              in standard laboratories without the need for expensive equipment.
            </BannerText>
          </Box>
        </Flex>
        <Flex justify="center">
          <Box width={2 / 3}>
            <BannerSubText>
              The following are lists of labs being used in real courses
              settings and provide all necessary information for performing
              those experiments.
            </BannerSubText>
          </Box>
        </Flex>
        <Flex justify="center">
          <Box width={[1, 1 / 2]}>
            <ListBox>{contentlist}</ListBox>
          </Box>
        </Flex>
        <Flex justify="center">
          <SectionBox id="davidk" width={2 / 3}>
            <h3>Dictyostelium cell biology course</h3>
            <SectionSubText>by Dr. David Knecht</SectionSubText>
            <SectionSubText>University of Connecticut</SectionSubText>
            <ListBox>{davidklist}</ListBox>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
        <Flex justify="center">
          <SectionBox id="derrickb" width={2 / 3}>
            <h3>Dictyostelium cell biology</h3>
            <SectionSubText>by Dr. Derrick Brazill</SectionSubText>
            <SectionSubText>Hunter College, New York</SectionSubText>
            <ListBox>{derrickblist}</ListBox>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
        <Flex justify="center">
          <SectionBox id="johnb" width={2 / 3}>
            <h3>Report on the number of cells in a slug</h3>
            <SectionSubText>
              by John Bonner
              <DownldBtn
                href={johnb.href}
                target="_self"
                download={johnb.doctitle}>
                Download
              </DownldBtn>
            </SectionSubText>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
        <Flex justify="center">
          <SectionBox id="thierrys" width={2 / 3}>
            <h3>Practical on chemotaxis</h3>
            <SectionSubText>by Dr. Thierry Soldati</SectionSubText>
            <SectionSubText>University of Geneva</SectionSubText>
            <p>
              <small>
                Includes a compilation of comments and suggestions received by
                Thierry Soldati (pdf files):
              </small>
            </p>
            <ListBox>{thierryslist}</ListBox>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
        <Flex justify="center">
          <SectionBox id="comments" width={2 / 3}>
            <h3>
              <Link href="#">Comments from Researchers</Link>
            </h3>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
        <Flex justify="center">
          <SectionBox id="references" width={2 / 3}>
            <h4>References suggested by contributors</h4>
            <ListBox>{referencelist}</ListBox>
            <Link href="#">
              <TopLink>Top</TopLink>
            </Link>
          </SectionBox>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Teach
