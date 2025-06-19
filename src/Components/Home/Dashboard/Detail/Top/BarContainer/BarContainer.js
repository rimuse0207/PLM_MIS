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
    // const barData = [
    //     { equipments: 'i7304C 1호기', MC: 1200, price: 2000 },
    //     { equipments: 'i7304C 2호기', MC: 2200, price: 3000 },
    //     { equipments: 'i7304C 3호기', MC: 3200, price: 5000 },
    //     { equipments: 'i7304C 4호기', MC: 3200, price: 5000 },
    //     { equipments: 'i7304C 5호기', MC: 3200, price: 5000 },
    //     { equipments: 'i7304C 6호기', MC: 3200, price: 5000 },
    // ];

    return (
        <BarContainerMainDivBox>
            <div className="Select_Line"></div>
            <Bars Bar_State={Detail_Bar_Data}></Bars>
        </BarContainerMainDivBox>
    );
};

export default BarContainer;
