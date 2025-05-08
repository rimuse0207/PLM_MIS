import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../API';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import Charts from './Exhalation/Charts/Charts';
import EquipmentExhalationContainer from './Exhalation/EquipmentExhalationContainer/EquipmentExhalationContainer';
import Loader from '../../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { AllEquipmentsfetchData } from '../../../Models/ReduxThunks/AllEquipmentsReducers/AllEquipmentsReducers';
import { useDispatch, useSelector } from 'react-redux';

export const EquimentListsMainPageMainDivBox = styled.div`
    .Lists_Containers_For_Equipment {
        position: relative;
        .Info_Container {
            position: absolute;
            top: -10px;
            right: -9px;
            color: skyblue;
            font-size: 20px;
            &:hover {
                cursor: pointer;
                color: gray;
            }
        }
    }

    .Equiment_Lists_Container {
        display: flex;
        flex-flow: wrap;
        li {
            width: 23%;
            border: 1px solid lightgray;
            margin: 10px;
            border-radius: 5px;
            padding: 10px;

            &:hover {
                cursor: pointer;
            }

            .Title_Container {
                border-bottom: 1px solid lightgray;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                .Title_Left_Container {
                    font-size: 1.2em;
                }
                .Title_Right_Container {
                    font-size: 0.9em;
                    text-align: end;
                }
            }
            .Calculate_Container {
                display: flex;
                .Calculate_Right_Container {
                    width: 65%;
                    border-right: 1px solid lightgray;
                    .Price_Showing_Title {
                        text-align: start;
                        font-size: 1.2em;
                        margin-bottom: 10px;
                    }
                    .Price_Showing_Description {
                        border-bottom: 1px solid lightgray;
                        font-size: 1.4em;
                        text-align: end;
                        padding-right: 10px;
                    }
                }
                .Calculate_Left_Container {
                    width: 35%;
                    text-align: center;
                    padding-left: 10px;
                }
            }
        }
    }
    .Graph_Cotainer {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .Graph_Left_Cotainer {
            width: 45%;
            border: 1px solid lightgray;
        }
        .Graph_Right_Cotainer {
            width: 45%;
            border: 1px solid lightgray;
        }
    }
`;

const Test_Data = [
    {
        All_Price: 0,
        Bom_Lists: [],
        CUSTOMER: '삼성물산',
        EQNO_BY_MODEL: '8',
        EQ_NO: 'ECFCI25040118',
        FSC_CD: 'CFCI-003',
        LINE: 'N/A',
        MC: 50,
        MODEL: 'EX9950C',
        Sell_Price: 100000000,
        WORKPLACE: '삼성물산',
        WO_NO: 'WO2503039',
        rn: '1',
    },
];

const Test_MC_Graph_Data = [
    {
        id: 'MC',
        data: [
            { x: '1호기', y: 40 },
            { x: '2호기', y: 45 },
            { x: '3호기', y: 50 },
            { x: '4호기', y: 60 },
            { x: '5호기', y: 70 },
            { x: '6호기', y: 80 },
        ],
    },
    {
        id: '단가',
        data: [
            { x: '1호기', y: 40 * 2 },
            { x: '2호기', y: 45 * 2 },
            { x: '3호기', y: 50 * 2 },
            { x: '4호기', y: 60 * 2 },
            { x: '5호기', y: 70 * 2 },
            { x: '6호기', y: 80 * 2 },
        ],
    },
];
const Test_MC_Rate_Graph_Data = [
    {
        id: 'MC율',
        data: [
            { x: '1호기', y: 40 },
            { x: '2호기', y: 45 },
            { x: '3호기', y: 50 },
            { x: '4호기', y: 60 },
            { x: '5호기', y: 70 },
            { x: '6호기', y: 80 },
        ],
    },
];

const EquimentListsMainPage = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const EquimentLists_State = useSelector(state => state.AllEquipmentsReducers_State);

    useEffect(() => {
        if (EquimentLists_State?.data?.length === 0) {
            dispatch(AllEquipmentsfetchData());
        }
    }, []);

    return (
        <EquimentListsMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <div>
                <div style={{ textAlign: 'end', marginRight: '20px', fontWeight: 'bolder' }}>
                    * PART 계산은 {moment().format('YY.MM.DD')} 일자의 <span style={{ color: 'red' }}>매매기준율</span>로 계산 됩니다.
                </div>
            </div>
            <ul className="Equiment_Lists_Container">
                {EquimentLists_State?.data.map(list => {
                    return (
                        <li key={list.WO_NO} onClick={() => Navigation(`/Select/Detail/Equipment/${list.MODEL}`)}>
                            <EquipmentExhalationContainer list={list}></EquipmentExhalationContainer>
                        </li>
                    );
                })}
            </ul>

            <Loader loading={EquimentLists_State.loading}></Loader>
        </EquimentListsMainPageMainDivBox>
    );
};

export default EquimentListsMainPage;
