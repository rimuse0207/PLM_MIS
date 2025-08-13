import React, { useEffect } from 'react';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import styled from 'styled-components';
import DepartTopMainPage from './Home/DepartTop/DepartTopMainpage';
import GraphsMainPage from './Home/Graphs/GraphsMainPage';
import { Request_Get_Axios } from '../../../API';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader';

const DashboardMainPageMainStyled = styled.div`
    background-color: #efefef;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
`;

const DashboardMainPage = () => {
    const DepartMentLists_State = useSelector(state => state.McAverage_ThunkReducers_State);
    return (
        <DashboardMainPageMainStyled>
            <NavigationMainPage></NavigationMainPage>
            <div>
                <DepartTopMainPage></DepartTopMainPage>
            </div>
            <div>
                <GraphsMainPage></GraphsMainPage>
            </div>
            <Loader loading={DepartMentLists_State.loading}></Loader>
        </DashboardMainPageMainStyled>
    );
};

export default DashboardMainPage;
