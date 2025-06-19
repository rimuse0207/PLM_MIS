import React, { useEffect, useState } from 'react';

import Donuts from './GraphsLists/Donuts';
import Bars from './GraphsLists/Bars';

import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../API';
import { Getting_Top6_Recent_Sell_Equipments_Lists } from '../../../../../Models/ReduxThunks/EISDashbaord/Graphs/RecentEquipmentsThunkReducers';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoaders from '../../../../../Loader/ClipLoader';

const GraphsMainPageMainDivBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .Graph_Container_GR {
        border: 1px solid lightgray;
        height: calc(100vh - 330px);
        background-color: #fff;
        box-shadow: -8px 8px 3px -5px lightgray;
        border-top: 4px solid rgb(0, 202, 255);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        position: relative;
        .Select_Group {
            position: absolute;
            top: 10px;
            display: flex;
            justify-content: space-between;
            width: 90%;
            z-index: 10000;
            left: 40px;
            h3 {
                font-size: 1.5em;
                font-weight: bolder;
            }
            .Unit_Container {
                position: absolute;
                top: 40px;
                right: 0px;
            }
        }
    }
`;

const GraphsMainPage = () => {
    const Pie_State = useSelector(state => state.Pie_Equipments_Sell_Thunk_Reducers_State);
    const Bar_State = useSelector(state => state.Recent_Equipments_ThunkReducers_State);
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [Pie_State_By_Selector, setPie_State_By_Selector] = useState([]);

    const [Select_Value, setSelect_Value] = useState('ALL');
    const [Pie_Selector_List, setPie_Selector_List] = useState([
        {
            value: 'ALL',
            label: '전체',
        },
        {
            value: 'Module',
            label: 'DC/Module',
        },
        {
            value: 'MBT',
            label: 'MBT',
        },
        {
            value: 'Storage',
            label: 'Storage',
        },
        {
            value: 'SoC',
            label: 'SOC',
        },
        {
            value: 'CLT',
            label: 'CLT',
        },
    ]);
    const HandleChangeOptions = e => {
        e.preventDefault();
        console.log(e);
        setSelect_Value(e.target.value);
    };

    useEffect(() => {
        if (Select_Value === 'ALL') {
            setPie_State_By_Selector(Pie_State.PieData);
        } else {
            Grouping_Data();
        }
    }, [Select_Value, Select_Date_State.value, Pie_State.PieData]);

    const Grouping_Data = () => {
        const Grouping_Models = [];
        const datas = Pie_State.PieData.map(list => {
            if (list.code === Select_Value) {
                return list.Lists.map(item => {
                    return Grouping_Models.push(item.Models);
                });
            }
        });
        const Delete_Duple_Data = [...new Set(Grouping_Models)];

        const Pies_data = Delete_Duple_Data.map(list => {
            const [abc] = Pie_State.PieData.filter(items => items.code === Select_Value);
            return {
                id: list,
                label: list,
                code: list,
                value: abc.Lists.filter(items => items.Models === list).reduce((pre, acc) => pre + (acc.Price * acc.QTY) / 1000000, 0),
            };
        });
        setPie_State_By_Selector(Pies_data);
    };

    return (
        <GraphsMainPageMainDivBox>
            <div className="Graph_Container_GR" style={{ width: '38%' }}>
                <div className="Select_Group">
                    <h3>매출액</h3>
                    <select onChange={e => HandleChangeOptions(e)} value={Select_Value}>
                        {Pie_Selector_List.map(list => {
                            return (
                                <option key={list.value} value={list.value}>
                                    {list.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {Pie_State.loading ? (
                    <ClipLoaders loading={Pie_State.loading}></ClipLoaders>
                ) : (
                    <Donuts Pie_State={Pie_State_By_Selector.filter(item => item.value > 0)}></Donuts>
                )}

                {/* {Pie_State_By_Selector.length > 0 ? (
                    <Donuts Pie_State={Pie_State_By_Selector.filter(item => item.value > 0)}></Donuts>
                ) : (
                    <></>
                )} */}
            </div>
            <div className="Graph_Container_GR" style={{ width: '58%' }}>
                <div className="Select_Group">
                    <h3>최근 판매 제품 판가 및 MC</h3>
                </div>
                {Bar_State.loading ? <ClipLoaders loading={Bar_State.loading}></ClipLoaders> : <Bars Bar_State={Bar_State.BarData}></Bars>}
            </div>
        </GraphsMainPageMainDivBox>
    );
};

export default GraphsMainPage;
