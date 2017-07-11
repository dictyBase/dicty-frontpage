// @flow
import React from 'react';
import { shallow } from 'enzyme';
import News from '../Components/News';
import styled from 'styled-components';
import twitterLogo from '../Components/images/twitterLogo.png';


it('renders without crashing', () => {
  const testPosts = [{
    id: 2,
    date: '2015.08.12',
    source: 'National Geographics',
  }];
  shallow(<News posts={testPosts} />);
});


it('contatins the text "DICTY NEWS"', () => {
  const testPosts = [{
    id: 2,
    date: '2015.08.12',
    source: 'National Geographics',
  }];
  const container = shallow(<News posts={testPosts} />);
  const detail = "DICTY NEWS";
  expect(container.contains(detail)).toEqual(true);
});

/*
it('contatins a logo with a link to Twitter', () => {
  const testPosts = [{
    id: 2,
    date: '2015.08.12',
    source: 'National Geographics',
  }];
  const Img = styled.img``;
  const container = shallow(<News posts={testPosts} />);
  const detail = <a
    href="https://twitter.com/dictybase"
    alt="Dicty News at Twitter"
    target="new"
  >
    <Img src={twitterLogo} />
  </a>;
  expect(container.contains(detail)).toEqual(true);
});


it('contatins text', () => {
  const testPosts = [{
    id: 2,
    date: '2015.08.12',
    source: 'National Geographics',
  }];
  const text = testPosts.map(post =>
    <ul key={post.id}>
      <li>
        {post.date}
        {post.source}
      </li>
    </ul>
  );
  const NewsBox = styled.li``;
  const container = shallow(<News posts={testPosts} />);
  const detail = <NewsBox>{text}</NewsBox>;
  expect(container.contains(detail)).toEqual(true);
});
*/
