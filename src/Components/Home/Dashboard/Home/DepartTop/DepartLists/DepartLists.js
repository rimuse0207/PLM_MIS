import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const DepartLists = ({ list }) => {
    const Navigation = useNavigate();

    const HandleClick_GoTo_DetailPage = Select_Data => {
        Navigation(`/Detail/${Select_Data.Department_code}`);
    };

    return (
        <DepartListsMainDivBox onClick={() => HandleClick_GoTo_DetailPage(list)}>
            <div style={{ marginTop: '10px' }}>
                <h2>{list.Department_Name}</h2>
            </div>
            <div className="Price_Container">
                <h2 style={{ fontSize: '2em' }}>87.0%</h2>
                <div>
                    <div>2,300 M</div>
                    <div>2,001 M</div>
                </div>
            </div>
            <div>
                <div>최근</div>
                <div>변동</div>
            </div>
        </DepartListsMainDivBox>
    );
};

export default DepartLists;
