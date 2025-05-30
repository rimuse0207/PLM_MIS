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
    .Main_Container {
        border: 3px dashed lightgray;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        position: relative;
        padding-top: 30px;
        h3 {
            background-color: #fff;
            position: absolute;
            top: -30px;
            font-size: 35px;
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

const EquimentListsMainPage = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const EquimentLists_State = useSelector(state => state.AllEquipmentsReducers_State);
    const [DevisionState, setDevisionState] = useState([
        {
            Department: 'Memory',
            Children: [
                [
                    {
                        Equipment_Name: 'S3000P',
                        FSC_Code: 'AASN-001',
                    },
                    {
                        Equipment_Name: 'S1610',
                        FSC_Code: 'AASN-002',
                    },
                    {
                        Equipment_Name: 'S810',
                        FSC_Code: 'AASN-003',
                    },
                    {
                        Equipment_Name: 'i1520',
                        FSC_Code: 'ABI1-001',
                    },
                ],
                [
                    {
                        Equipment_Name: 'i7304C',
                        FSC_Code: 'ACI7-001',
                    },
                ],
                [
                    {
                        Equipment_Name: 'i2154H',
                        FSC_Code: 'ADI2-001',
                    },
                ],
            ],
        },
        {
            Department: 'Storage',
            Children: [
                [
                    {
                        Equipment_Name: 'SST32KA_Half_A',
                        FSC_Code: 'BEG5-001',
                    },
                    {
                        Equipment_Name: 'SST32KA_Half_A',
                        FSC_Code: 'BEG5-002',
                    },
                    {
                        Equipment_Name: 'SST32KF THB',
                        FSC_Code: 'BEG-003',
                    },
                    {
                        Equipment_Name: 'SST32KA FULL',
                        FSC_Code: 'BEG5-004',
                    },
                    {
                        Equipment_Name: 'SST32KF FULL',
                        FSC_Code: 'BEG5-005',
                    },
                    {
                        Equipment_Name: 'SST32KA_Half_B',
                        FSC_Code: 'BEG5-006',
                    },
                    {
                        Equipment_Name: 'SST32KA_Half_B',
                        FSC_Code: 'BEG5-007',
                    },
                ],
            ],
        },
        {
            Department: 'SoC',
            Children: [
                [
                    {
                        Equipment_Name: 'i9950CP-HOT',
                        FSC_Code: 'CFCI-001',
                    },
                    {
                        Equipment_Name: 'i9950CP-Cold',
                        FSC_Code: 'CFCI-002',
                    },
                ],
            ],
        },
    ]);
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

            {DevisionState.map((item, j) => {
                return (
                    <div className="Main_Container">
                        <h3>{item.Department}</h3>
                        {item.Children.map(Devisions => {
                            return (
                                <ul className="Equiment_Lists_Container">
                                    {Devisions.map(equipment => {
                                        {
                                            return EquimentLists_State.data.map(list => {
                                                return list.FSC_CD === equipment.FSC_Code ? (
                                                    <li
                                                        key={list.WO_NO}
                                                        onDoubleClick={() => Navigation(`/Select/Detail/Equipment/${list.MODEL}`)}
                                                        style={
                                                            list.source === 'SBMS'
                                                                ? { background: 'RGB(254, 231, 23, 0.3)' }
                                                                : { background: 'RGB(135, 206, 235, 0.3)' }
                                                        }
                                                    >
                                                        <EquipmentExhalationContainer list={list}></EquipmentExhalationContainer>
                                                    </li>
                                                ) : (
                                                    <></>
                                                );
                                            });
                                        }
                                    })}
                                </ul>
                            );
                        })}
                    </div>
                );
            })}
            <Loader loading={EquimentLists_State.loading}></Loader>
        </EquimentListsMainPageMainDivBox>
    );
};

export default EquimentListsMainPage;
