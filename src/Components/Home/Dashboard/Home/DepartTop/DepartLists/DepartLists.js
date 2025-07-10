import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaWonSign } from 'react-icons/fa6';

const DepartListsMainDivBox = styled.div`
    border: 1px solid lightgray;
    border-left: 1px solid rgb(0, 202, 255);
    width: 18%;
    height: 150px;
    background-color: #fff;
    box-shadow: -8px 8px 3px -5px lightgray;
    border-radius: 5px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 260px;
    &:hover {
        cursor: pointer;
        background-color: #efefef;
    }
    .Price_Container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h2 {
            width: 60%;
            text-align: center;
        }
    }
    .Money_Containers {
        font-weight: bolder;
        font-size: 1.1em;
        text-align: end;
    }
`;

const DepartLists = ({ list }) => {
    const Navigation = useNavigate();

    const HandleClick_GoTo_DetailPage = Select_Data => {
        Navigation(`/Sub/Detail/${Select_Data.Department_code}`);
    };

    return (
        <DepartListsMainDivBox onClick={() => HandleClick_GoTo_DetailPage(list)}>
            <div style={{ marginTop: '10px' }}>
                <h2>{list.Department_Name}</h2>
            </div>
            <div className="Price_Container">
                <h2 style={{ fontSize: '6vmin' }}>
                    {list.MC_Price ? ((list.MC_Price / list.Total_unit_price_amount) * 100).toFixed(1) : 0}%
                </h2>
                <div style={{ width: '40%', borderLeft: '1px solid lightgray' }}>
                    <div className="Money_Containers">
                        <div style={{ fontSize: '0.8em', textAlign: 'start', marginLeft: '20px' }}>MC</div>
                        <div>&#8361; {(list.MC_Price / 1000000).toLocaleString('ko-KR')} M</div>
                    </div>
                    <div className="Money_Containers" style={{ marginTop: '20px' }}>
                        <div style={{ fontSize: '0.8em', textAlign: 'start', marginLeft: '20px' }}>판가</div>
                        <div>&#8361; {(list.Total_unit_price_amount / 1000000).toLocaleString('ko-KR')} M</div>
                    </div>
                </div>
            </div>
        </DepartListsMainDivBox>
    );
};

export default DepartLists;
