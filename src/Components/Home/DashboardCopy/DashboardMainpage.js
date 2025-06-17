import React from 'react';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import styled from 'styled-components';
import DepartTopMainPage from './Home/DepartTop/DepartTopMainpage';
import GraphsMainPage from './Home/Graphs/GraphsMainPage';

const DashboardMainPageMainStyled = styled.div`
    background-color: #efefef;
    min-height: 100vh;
`;

const DashboardMainPage = () => {
    return (
        <DashboardMainPageMainStyled>
            <NavigationMainPage></NavigationMainPage>
            <div>
                <DepartTopMainPage></DepartTopMainPage>
            </div>
            <div>
                <GraphsMainPage></GraphsMainPage>
            </div>
        </DashboardMainPageMainStyled>
    );
};

export default DashboardMainPage;
