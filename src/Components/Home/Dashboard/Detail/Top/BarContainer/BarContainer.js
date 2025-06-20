import React from 'react';
import styled from 'styled-components';
import Bars from '../../../Home/Graphs/GraphsLists/Bars';

const BarContainerMainDivBox = styled.div`
    border: 1px solid lightgray;
    box-shadow: -8px 8px 3px -5px lightgray;
    background-color: #fff;
    height: calc(100vh - 20vh - 100px);

    margin-top: 12px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .Select_Line {
        height: 3px;
        background-color: rgb(0, 202, 255);
    }
`;

const BarContainer = ({ Detail_Bar_Data }) => {
    return (
        <BarContainerMainDivBox>
            <div className="Select_Line"></div>
            <Bars Bar_State={Detail_Bar_Data}></Bars>
        </BarContainerMainDivBox>
    );
};

export default BarContainer;
