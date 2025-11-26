import React, { useEffect, useState } from 'react';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import SideNavigationMainPage from '../../Navigation/SideNavigation/SideNavigationMainPage';
import { useSelector } from 'react-redux';
import { Request_Get_Axios } from '../../../API/index';
import styled from 'styled-components';

const MainCotainerStyledContainer = styled.div`
    display: flex;
    .Right_Cotainer {
        width: calc(100%-200px);
        padding-left: 30px;
        .Menu_List_By_Equipment {
            margin-top: 10px;
            display: flex;
            li {
                width: 120px;
                text-align: center;
                border-bottom: 2px solid lightgray;
                padding-top: 10px;
                padding-bottom: 10px;
                margin-right: 5px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        table,
        th,
        td {
            border: 1px solid black;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th {
            vertical-align: top;
            height: 50px;
        }
        td {
            vertical-align: bottom;
            padding: 10px;
        }
    }
`;

const EquimentMcMainPage = () => {
    const Equipment_Info_State = useSelector(state => state.Equipment_Select_Reducer_State.Equipment_Info);
    const [Equipment_Exhalation_Lists, setEquipment_Exhalation_Lists] = useState([]);
    const [Selected_Exhalation_Info, setSelected_Exhalation_Info] = useState(null);
    const [MC_Data, setMC_Data] = useState([]);
    useEffect(() => {
        if (Equipment_Info_State.menu_name) {
            Getting_Equipment_Exhalation_Infos();
            setSelected_Exhalation_Info(null);
        }
    }, [Equipment_Info_State.menu_name]);

    useEffect(() => {
        if (Selected_Exhalation_Info?.EQ_NO) Getting_Equipment_MC_Info_Data();
    }, [Selected_Exhalation_Info]);

    const Getting_Equipment_Exhalation_Infos = async () => {
        setMC_Data([]);
        const Sending_Equipment_Fsc_Code_To_Server_Axios = await Request_Get_Axios(
            '/PLM_Route/PLM_Dashboard/Get_Equiment_Exhalation_Info_FROM_SBMS',
            { FSC_CODE: Equipment_Info_State.FSC_Code }
        );
        if (Sending_Equipment_Fsc_Code_To_Server_Axios.status) {
            setEquipment_Exhalation_Lists(Sending_Equipment_Fsc_Code_To_Server_Axios.data);
        } else {
        }
    };

    const Getting_Equipment_MC_Info_Data = async () => {
        setMC_Data([]);
        const Getting_Equipment_MC_Info_Data_Axios = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Getting_PLM_MBOM', {
            EQ_NO: Selected_Exhalation_Info.EQ_NO,
        });
        if (Getting_Equipment_MC_Info_Data_Axios.status) {
            setMC_Data(Getting_Equipment_MC_Info_Data_Axios.data);
        }
    };

    return (
        <div>
            <NavigationMainPage></NavigationMainPage>
            <MainCotainerStyledContainer>
                {/* <SideNavigationMainPage></SideNavigationMainPage> */}
                {/* <div className="Right_Cotainer">
                    <div>
                        <h2>{Equipment_Info_State.menu_name}</h2>
                        <ul className="Menu_List_By_Equipment">
                            {Equipment_Exhalation_Lists.map(list => {
                                return (
                                    <li
                                        onClick={() => setSelected_Exhalation_Info(list)}
                                        style={list.EQ_NO === Selected_Exhalation_Info?.EQ_NO ? { borderBottom: '2px solid skyblue' } : {}}
                                    >
                                        {Number(list.EQ_NO.slice(list.EQ_NO.length - 3, list.EQ_NO.length))} 호기
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {Selected_Exhalation_Info ? (
                        <div>
                            <span>MBom정보 및 Part 단가 </span>
                            <div>
                                <h3 style={{ marginTop: '30px', marginBottom: '30px' }}>
                                    MC :{' '}
                                    {MC_Data.reduce((sum, currValue) => {
                                        return sum + currValue.Price;
                                    }, 0).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
                                    원
                                </h3>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>필요 Part 수량</th>
                                                <th>Part 번호</th>
                                                <th>ERP 구입 수량</th>
                                                <th>ERP 구입 금액</th>
                                                <th>필요 Part 수량 * ERP Part 단가</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MC_Data.slice(1, 50).map(list => {
                                                return (
                                                    <tr key={list.ERP_PART}>
                                                        <td>{list.Part_Qty.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}</td>
                                                        <td>{list.ERP_PART}</td>
                                                        <td>{list.Purchase_qty.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}</td>
                                                        <td>{list.Purchase_price.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}</td>
                                                        <td>{list.Price.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div> */}
            </MainCotainerStyledContainer>
        </div>
    );
};

export default EquimentMcMainPage;
