import React, { useEffect, useState } from 'react';
import DepartLists from './DepartLists/DepartLists';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Getting_MC_average_compared_to_sales_price_by_sector } from '../../../../../Models/ReduxThunks/EISDashbaord/McAverageThunkReducers';

const DepartTopMainPageMainDivBox = styled.div`
    .Select_Line {
        margin-top: 20px;
        height: 4px;
        background-color: rgb(0, 202, 255);
        position: relative;
        .Line_Title {
            background-color: #fff;
            position: absolute;
            top: -15px;
            font-size: 1.5em;
            font-weight: bolder;
            padding-left: 15px;
            padding-right: 15px;
            left: 35px;
        }
    }
    .Top_Depart_Lists_GR {
        display: flex;
        justify-content: space-around;
    }
`;

const DepartTopMainPage = () => {
    const dispatch = useDispatch();
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const DepartMentLists_State = useSelector(state => state.McAverage_ThunkReducers_State);
    useEffect(() => {
        dispatch(Getting_MC_average_compared_to_sales_price_by_sector(Select_Date_State.value));
    }, [Select_Date_State.value]);

    return (
        <DepartTopMainPageMainDivBox>
            <div className="Select_Line">
                <div className="Line_Title">부문별 판가 대비 MC 평균</div>
            </div>
            <ul className="Top_Depart_Lists_GR">
                {DepartMentLists_State.DepartMentLists.map(list => {
                    return <DepartLists key={list.Department_Name} list={list}></DepartLists>;
                })}
            </ul>
        </DepartTopMainPageMainDivBox>
    );
};

export default DepartTopMainPage;
