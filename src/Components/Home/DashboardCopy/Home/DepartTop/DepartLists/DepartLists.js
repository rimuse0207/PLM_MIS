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
    position: relative;
    .Apper_Container {
        position: absolute;
        right: 10px;
        top: 5px;
        font-weight: bolder;
    }
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
        if (Select_Data.Department_code === 'CLT') Navigation(`/Detail/${Select_Data.Department_code}`);
    };

    return (
        <DepartListsMainDivBox onClick={() => HandleClick_GoTo_DetailPage(list)}>
            <div style={{ marginTop: '10px' }}>
                <h2>{list.Department_Name}</h2>
            </div>
            <div className="Apper_Container">모델명: {list.appear_equipment}</div>
            <div className="Price_Container">
                <h2 style={{ fontSize: '6vmin' }}>{((list.price / list.sell_price) * 100).toFixed(1)}%</h2>
                <div style={{ width: '40%', borderLeft: '1px solid lightgray' }}>
                    <div className="Money_Containers">
                        <div style={{ fontSize: '0.8em', textAlign: 'start', marginLeft: '20px' }}>MC</div>
                        <div>&#8361; {list.price.toLocaleString()} M</div>
                    </div>
                    <div className="Money_Containers" style={{ marginTop: '20px' }}>
                        <div style={{ fontSize: '0.8em', textAlign: 'start', marginLeft: '20px' }}>판가</div>
                        <div>&#8361; {list.sell_price.toLocaleString()} M</div>
                    </div>
                </div>
            </div>
        </DepartListsMainDivBox>
    );
};

export default DepartLists;
