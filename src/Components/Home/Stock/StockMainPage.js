import React from 'react';
import StockContainer from './StockContainer/StockContainer';
import TopNavigationMainPage from '../../Navigation/TopNavigation/TopNavigationMainPage';
import styled from 'styled-components';

const StockMainPageMainDivBox = styled.div`
    width: 100%;
    overflow-x: hidden;
`;
const StockMainPage = () => {
    return (
        <StockMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <StockContainer></StockContainer>
        </StockMainPageMainDivBox>
    );
};

export default StockMainPage;
