import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../../Navigation/NavigationMainPage';
import TopContainer from './Top/TopContainer';
import SideContainer from './Side/SideContainer';

const DetailMainPageMainDivBox = styled.div`
    .Detail_Group {
        background-color: #efefef;
        &::after {
            content: '';
            clear: both;
            display: block;
        }
        .Detail_Left {
            width: 68%;
            height: calc(100vh - 80px);

            float: left;
            margin-left: 10px;
        }
        .Detail_Right {
            width: 30%;
            height: calc(100vh - 80px);

            float: right;
            margin-right: 10px;
        }
    }
`;

const DetailMainPage = () => {
    return (
        <DetailMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <div className="Detail_Group">
                <div className="Detail_Left">
                    <TopContainer></TopContainer>
                </div>
                <div className="Detail_Right">
                    <SideContainer></SideContainer>
                </div>
            </div>
        </DetailMainPageMainDivBox>
    );
};

export default DetailMainPage;
