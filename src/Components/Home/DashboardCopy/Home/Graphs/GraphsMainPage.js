import React from 'react';

import Donuts from './GraphsLists/Donuts';
import Bars from './GraphsLists/Bars';

import styled from 'styled-components';

const GraphsMainPageMainDivBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .Graph_Container_GR {
        border: 1px solid lightgray;
        height: calc(100vh - 330px);
        background-color: #fff;
        box-shadow: -8px 8px 3px -5px lightgray;
        border-top: 4px solid rgb(0, 202, 255);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        position: relative;
        .Select_Group {
            position: absolute;
            top: 10px;
            display: flex;
            justify-content: space-between;
            width: 90%;
            z-index: 10000;
            left: 40px;
            h3 {
                font-size: 1.5em;
                font-weight: bolder;
            }
            .Unit_Container {
                position: absolute;
                top: 40px;
                right: 0px;
            }
        }
    }
`;

const GraphsMainPage = () => {
    return (
        <GraphsMainPageMainDivBox>
            <div className="Graph_Container_GR" style={{ width: '38%' }}>
                <div className="Select_Group">
                    <h3>
                        25년 매출액 <span style={{ color: 'blue', fontSize: '0.8em' }}> : 10,364 M</span>
                    </h3>
                    <div>6월 기준</div>
                </div>
                <Donuts></Donuts>
            </div>
            <div className="Graph_Container_GR" style={{ width: '58%' }}>
                <div className="Select_Group">
                    <h3>최근 판매 제품 판가 및 MC</h3>
                </div>
                <Bars></Bars>
            </div>
        </GraphsMainPageMainDivBox>
    );
};

export default GraphsMainPage;
