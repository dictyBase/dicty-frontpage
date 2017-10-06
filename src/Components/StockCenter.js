// @flow
import React from 'react';
import FontAwsome from 'react-fontawesome';

import {
  StockTitle,
  StockHeader,
  StockSubHeader,
  ListBox,
  StockBox,
  AnnotationListItems,
  StockContainer,
  MoreLink,
  NewsStockTitle
} from './styles';

const StockCenter = props => {
  const plasmidlist = props.stockcenter.plasmids.map((plasmid, index) =>
    <AnnotationListItems key={index}>
      {plasmid}
    </AnnotationListItems>
  );

  const strainlist = props.stockcenter.strains.map((strain, index) =>
    <AnnotationListItems key={index}>
      {strain}
    </AnnotationListItems>
  );

  return (
    <StockContainer>
      <StockHeader>
        <FontAwsome name="shopping-cart fa-md" />
        <NewsStockTitle>DICTY STOCK CENTER</NewsStockTitle>
      </StockHeader>
      <StockSubHeader>New items</StockSubHeader>
      <StockBox>
        <StockTitle>PLASMIDS</StockTitle>
        <ListBox margintop="5px" padbottom="0px">
          {plasmidlist}
        </ListBox>
        <MoreLink padbottom="0px">
          <FontAwsome name="plus fa-xs" />
        </MoreLink>
      </StockBox>
      <StockBox color="white" background={'#0489B1'}>
        <StockTitle>STRAINS</StockTitle>
        <ListBox margintop="5px" padbottom="0px">
          {strainlist}
        </ListBox>
        <MoreLink padbottom="0px">
          <FontAwsome name="plus fa-xs" />
        </MoreLink>
      </StockBox>
    </StockContainer>
  );
};

export default StockCenter;
