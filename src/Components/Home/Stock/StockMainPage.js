import React from 'react';
import StockContainer from './StockContainer/StockContainer';
import TopNavigationMainPage from '../../Navigation/TopNavigation/TopNavigationMainPage';

const StockMainPage = () => {
    return (
        <div>
            <TopNavigationMainPage></TopNavigationMainPage>
            <StockContainer></StockContainer>
        </div>
    );
};

export default StockMainPage;
