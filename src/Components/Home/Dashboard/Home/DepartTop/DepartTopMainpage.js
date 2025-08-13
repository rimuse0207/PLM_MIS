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
        .Button_Containers {
            position: absolute;
            top: -15px;
            right: 70px;
            button {
                padding: 7px 10px;
                background-color: #fff;
                border: 1px solid lightgray;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .Top_Depart_Lists_GR {
        display: flex;
        justify-content: space-around;
    }
`;

const DepartTopMainPage = () => {
    const DepartMentLists_State = useSelector(state => state.McAverage_ThunkReducers_State);
    const [EaChecking, setEachecking] = useState(DepartMentLists_State.DepartMentLists.length);
    useEffect(() => {
        setEachecking(DepartMentLists_State.DepartMentLists.length);
    }, [DepartMentLists_State]);
    return (
        <DepartTopMainPageMainDivBox>
            <div className="Select_Line">
                <div className="Line_Title">최근 판매 된 장비 및 Board MC율</div>
                <div className="Button_Containers">
                    {EaChecking - 5 !== 0 ? (
                        <button onClick={() => setEachecking(EaChecking - 1)}>이전</button>
                    ) : (
                        <button style={{ background: 'lightgray' }}>이전</button>
                    )}

                    {EaChecking === DepartMentLists_State.DepartMentLists.length ? (
                        <button style={{ background: 'lightgray' }}>이후</button>
                    ) : (
                        <button onClick={() => setEachecking(EaChecking + 1)}>이후</button>
                    )}
                </div>
            </div>

            <ul className="Top_Depart_Lists_GR">
                {DepartMentLists_State.DepartMentLists.slice(EaChecking - 5, EaChecking).map(list => {
                    return <DepartLists key={list.Department_Name} list={list}></DepartLists>;
                })}
            </ul>
        </DepartTopMainPageMainDivBox>
    );
};

export default DepartTopMainPage;
