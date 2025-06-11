import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StockBarGraph from './StockGraph/StockBarGraph';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Request_Get_Axios } from '../../../../API';
import Loader from '../../../../Loader/Loader';

const MainStockContainerDiv = styled.div`
    border: 1px solid lightgray;
    .Top_Container {
        height: 50vh;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
        .Left_Container {
            width: 40%;
            border: 1px solid lightgray;
            float: left;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .Right_Container {
            width: 60%;
            border: 1px solid lightgray;
            float: right;
            height: 100%;
        }
    }
    .Price_Showing_Container {
        border: 1px solid lightgray;
        width: 50%;
        .Price_Title {
            font-size: 2em;
            text-align: center;
            padding: 10px;
        }
        .Price_Desc {
            font-size: 1.2em;
            text-align: center;
            border-top: 1px solid lightgray;
            padding: 10px;
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
            width: 500px;
            .Price_Title {
                font-size: 2em;
                text-align: center;
                padding: 10px;
            }
            .Price_Desc {
                font-size: 1.2em;
                text-align: center;
                border-top: 1px solid lightgray;
                padding: 10px;
            }
        }
    }

    .Detail_Table {
        margin-top: 50px;
        table {
            width: 50%;
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
`;

const StockContainer = () => {
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [Stock_Bar_State, setStock_Bar_State] = useState([]);
    const [Get_Part_List, setGet_Part_List] = useState([]);
    const [Stock_Grouping_State, setStock_Grouping_State] = useState([]);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        Getting_Select_Stock_Data_For_Bar_Graph();
    }, [Select_Date_State.value]);
    const getMonthsOfYearUntilNow = async year => {
        const current = moment();
        const currentYear = current.year();
        let monthCount;

        if (year < currentYear) {
            monthCount = 12; // 과거: 전체 월
        } else if (Number(year) === currentYear) {
            monthCount = current.month() + 1; // 현재 연도: 현재 월까지 (0-indexed)
        } else {
            monthCount = 0; // 미래 연도: 없음
        }

        return Array.from({ length: monthCount }, (_, i) => moment(`${year}-${i + 1}`, 'YYYY-M').format('YYYYMM'));
    };

    const Getting_Select_Stock_Data_For_Bar_Graph = async () => {
        try {
            setLoading(true);
            const Months = await getMonthsOfYearUntilNow(Select_Date_State.value);
            const GetMonths = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Select_Stock_Data_For_Bar_Graph', { Months });
            console.log(GetMonths);
            if (GetMonths.status) {
                setStock_Bar_State(GetMonths.data.Getting_Graph_Data);
                setGet_Part_List(GetMonths.data.Getting_Now_Stock_Data_List);
                const grouped = GetMonths.data.Getting_Now_Stock_Data_List.reduce((acc, item) => {
                    const key = item.ItemSName;
                    if (!acc[key]) {
                        acc[key] = {
                            category: key,
                            totalPrice: 0,
                            items: [],
                        };
                    }
                    acc[key].totalPrice += item.Price;
                    acc[key].items.push(item);
                    return acc;
                }, {});

                const result = Object.values(grouped);
                const sortedResult = result.sort((a, b) => b.totalPrice - a.totalPrice);
                setStock_Grouping_State(sortedResult);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    function numberToKorean(number) {
        var inputNumber = number < 0 ? false : number;
        var unitWords = ['', '만', '억', '조', '경'];
        var splitUnit = 10000;
        var splitCount = unitWords.length;
        var resultArray = [];
        var resultString = '';

        for (var i = 0; i < splitCount; i++) {
            var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
            unitResult = Math.floor(unitResult);
            if (unitResult > 0) {
                resultArray[i] = unitResult;
            }
        }

        for (var i = 0; i < resultArray.length; i++) {
            if (!resultArray[i]) continue;
            resultString = String(resultArray[i]) + unitWords[i] + ' ' + resultString;
        }

        return resultString;
    }

    return (
        <MainStockContainerDiv>
            <div className="Top_Container">
                <div className="Left_Container">
                    <div className="Price_Showing_Container">
                        <div className="Price_Title">재고금액</div>
                        <div className="Price_Desc">{numberToKorean(Get_Part_List.reduce((pre, next) => pre + next.Price, 0))} 원</div>
                    </div>
                </div>
                <div className="Right_Container">
                    <h2>월별 재고금액</h2>
                    {Stock_Bar_State.length > 0 ? <StockBarGraph Stock_Bar_State={Stock_Bar_State}></StockBarGraph> : <></>}
                </div>
            </div>
            <div>
                <div style={{ borderBottom: '1px solid lightgray', paddingBottom: '20px' }}>
                    <h2>주요 구매처 별 재고 금액</h2>
                    <div>
                        <ul>
                            <li>
                                <div className="Price_Showing_Container">
                                    <div className="Price_Title">ADI</div>
                                    <div className="Price_Desc">
                                        {numberToKorean(
                                            Get_Part_List.filter(
                                                item => item.ItemSName.startsWith('ANALOG') || item.ItemSName.startsWith('Analog')
                                            ).reduce((pre, next) => pre + next.Price, 0)
                                        )}{' '}
                                        원
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="Price_Showing_Container">
                                    <div className="Price_Title">INTEL</div>
                                    <div className="Price_Desc">
                                        {numberToKorean(
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
            <div className="Detail_Table">
                <table>
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>메이커명</th>
                            <th>총 금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Stock_Grouping_State.map((list, j) => {
                            return (
                                <tr>
                                    <td>{j + 1}</td>
                                    <td>{list.category}</td>
                                    <td>{numberToKorean(list.totalPrice)} 원</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Loader loading={Loading}></Loader>
        </MainStockContainerDiv>
    );
};

export default StockContainer;
