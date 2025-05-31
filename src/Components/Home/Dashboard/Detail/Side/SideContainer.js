import React from 'react';
import SideContent from './SideContent/SideContent';
import styled from 'styled-components';

const SideContainerMainDivBox = styled.div`
    border: 1px solid lightgray;
    height: 99%;
    box-shadow: -8px 8px 3px -5px lightgray;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .Select_Line {
        height: 3px;
        background-color: rgb(0, 202, 255);
    }
`;

const SideContainer = () => {
    return (
        <SideContainerMainDivBox>
            <div className="Select_Line"></div>
            <SideContent></SideContent>
        </SideContainerMainDivBox>
    );
};

export default SideContainer;
