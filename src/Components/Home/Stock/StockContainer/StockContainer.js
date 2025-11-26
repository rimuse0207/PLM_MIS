import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StockBarGraph from './StockGraph/StockBarGraph';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { API_Request_Get_Axios, API_Request_Post_Axios, Request_Get_Axios } from '../../../../API';
import Loader from '../../../../Loader/Loader';
import { Change_Grouping_Price, formatCurrency, getMonthsOfYearUntilNow, numberToKorean } from '../CommonFunc/CommonFunc';
import { useNavigate } from 'react-router-dom';

const MainStockContainerDiv = styled.div`
    height: calc(100vh - 100px);
    .Top_Container {
        height: 60%;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
        .Left_Container {
            width: 40%;

            float: left;
            height: 100%;
            background-color: #efefef;
        }
        .Right_Container {
            width: 60%;

            float: right;
            height: 100%;
            .Graph_Box_Container {
                padding-top: 5px;
                .title {
                    font-size: 3vmin;
                    font-weight: bolder;
                    margin-top: 10px;
                    margin-left: 10px;

                    display: inline;
                    position: relative;
                    .Unit_Container {
                        font-size: 2vmin;
                        font-weight: lighter;
                        padding-left: 100px;
                        position: absolute;
                        right: 0px;
                        width: 200%;
                        top: 20px;
                        left: 80px;
                    }
                }
            }
        }
    }
    .Price_Showing_Container {
        border: 1px solid lightgray;
        width: 99%;
        height: 100%;
        background-color: #fff;
        box-shadow: -8px 8px 3px -5px lightgray;
        border-radius: 5px;
        margin-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        border-top: 3px solid rgb(0, 202, 255);
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;

        .Price_Title {
            font-size: 5vmin;
            text-align: center;
            padding: 10px;
            font-weight: bolder;
            height: 35%;
            display: flex;
            justify-content: center;
            align-items: end;
        }
        .Price_Desc {
            font-size: 7vmin;
            font-weight: bolder;
            text-align: center;
            padding: 10px;
            color: rgb(0, 202, 255);
            height: 65%;
            display: flex;
            justify-content: center;
            align-items: start;
            padding-top: 40px;
        }
    }
    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
    }
    li {
        .Price_Showing_Container {
            border: 1px solid lightgray;
            min-width: 500px;
            height: 150px;
            width: 33%;
            border-left: 2px solid rgb(0, 202, 255);
            .Price_Title {
                text-align: center;
                padding: 10px;
                height: 50%;
                font-size: 4vmin;
            }
            .Price_Desc {
                font-size: 1.8em;
                text-align: center;
                border-top: 1px solid lightgray;
                padding: 10px;
                color: #000;
                padding-top: 0px;
                height: 50%;
                align-items: center;
            }
        }
    }

    .Detail_Table {
        margin-top: 50px;
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        th,
        td {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
            color: black;
        }
    }
    .Custom_By_Sotcks_Container {
        margin-top: 30px;
        height: 100%;
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
            .Button_Container {
                background-color: #fff;
                position: absolute;
                right: 50px;
                top: -23px;
                padding: 10px;
                box-shadow: -8px 8px 3px -5px lightgray;
                border-radius: 5px;
                font-size: 2vmin;
                border: 1px solid lightgray;
                &:hover {
                    cursor: pointer;
                    background-color: #efefef;
                }
            }
        }
    }
`;

const StockContainer = () => {
    const Navigation = useNavigate();
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [Stock_Bar_State, setStock_Bar_State] = useState([]);
    const [Get_Part_List, setGet_Part_List] = useState([]);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        Getting_Select_Stock_Data_For_Bar_Graph();
    }, [Select_Date_State.value]);

    const Getting_Select_Stock_Data_For_Bar_Graph = async () => {
        try {
            setLoading(true);
            const Months = await getMonthsOfYearUntilNow(Select_Date_State.value);
            const GetMonths = await API_Request_Post_Axios('/ERPStock/Select_Stock_Data_For_Bar_Graph', { Months });

            if (GetMonths.status) {
                setStock_Bar_State(GetMonths.data.Getting_Graph_Data);
                setGet_Part_List(GetMonths.data.Getting_Now_Stock_Data_List);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <MainStockContainerDiv>
            <div className="Top_Container">
                <div className="Left_Container">
                    <div className="Select_Line"></div>
                    <div className="Price_Showing_Container">
                        <div className="Price_Title">총 재고 금액</div>
                        <div className="Price_Desc">{formatCurrency(Get_Part_List.reduce((pre, next) => pre + next.Price, 0))} 원</div>
                    </div>
                </div>
                <div className="Right_Container">
                    <div className="Price_Showing_Container">
                        <div className="Graph_Box_Container">
                            <div className="title">
                                월별 재고 금액
                                <span className="Unit_Container">(단위: 억원)</span>
                            </div>
                        </div>
                        {Stock_Bar_State.length > 0 ? <StockBarGraph Stock_Bar_State={Stock_Bar_State}></StockBarGraph> : <></>}
                    </div>
                </div>
            </div>
            <div style={{ height: 'calc(40% - 40px)' }}>
                <div className="Custom_By_Sotcks_Container">
                    <div className="Select_Line">
                        <div className="Line_Title">주요 구매처 별 재고 금액</div>
                        <div className="Button_Container" onClick={() => Navigation('/ERP/Stock/Part/Detail/Table')}>
                            상세 내역
                        </div>
                    </div>
                    <div style={{ borderBottom: '1px solid lightgray', height: '100%' }}>
                        <div style={{ height: '100%' }}>
                            <ul style={{ height: '100%' }}>
                                <li>
                                    <div className="Price_Showing_Container">
                                        <div className="Price_Title">Analog Devices</div>
                                        <div className="Price_Desc">
                                            {formatCurrency(
                                                Get_Part_List.filter(
                                                    item =>
                                                        item.ItemSName.startsWith('ANALOG') ||
                                                        item.ItemSName.startsWith('Analog') ||
                                                        item.ItemSName.startsWith('ADI')
                                                ).reduce((pre, next) => pre + next.Price, 0)
                                            )}{' '}
                                            원
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="Price_Showing_Container">
                                        <div className="Price_Title">XILINX</div>
                                        <div className="Price_Desc">
                                            {formatCurrency(
                                                Get_Part_List.filter(item => item.ItemSName.startsWith('XILINX')).reduce(
                                                    (pre, next) => pre + next.Price,
                                                    0
                                                )
                                            )}{' '}
                                            원
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="Price_Showing_Container">
                                        <div className="Price_Title">INTEL</div>
                                        <div className="Price_Desc">
                                            {formatCurrency(
                                                Get_Part_List.filter(item => item.ItemSName.startsWith('INTEL')).reduce(
                                                    (pre, next) => pre + next.Price,
                                                    0
                                                )
                                            )}{' '}
                                            원
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Loader loading={Loading}></Loader>
        </MainStockContainerDiv>
    );
};

export default StockContainer;
