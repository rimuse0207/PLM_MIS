import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../../Navigation/NavigationMainPage';
import TopContainer from './Top/TopContainer';
import SideContainer from './Side/SideContainer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Request_Get_Axios } from '../../../../API';
import Loader from '../../../../Loader/Loader';

const DetailMainPageMainDivBox = styled.div`
    .Detail_Group {
        background-color: #efefef;
        &::after {
            content: '';
            clear: both;
            display: block;
        }
        .Detail_Left {
            width: 68%;
            height: calc(100vh - 80px);

            float: left;
            margin-left: 10px;
        }
        .Detail_Right {
            width: 30%;
            height: calc(100vh - 80px);

            float: right;
            margin-right: 10px;
        }
    }
`;

const DetailMainPage = () => {
    const [Selector_Value, setSelector_Value] = useState('ALL');
    const [DepartMentLists, setDepartMentLists] = useState([
        {
            Department_Name: 'DC/Module',
            Department_code: 'Module',
            equipment_Lists: ['S810', 'S1610', 'S3000P', 'i1000', 'i1520'],
        },
        {
            Department_Name: 'MBT',
            Department_code: 'MBT',
            equipment_Lists: ['i2122H', 'i2154H'],
        },
        {
            Department_Name: 'Storage',
            Department_code: 'Storage',
            equipment_Lists: ['i3930KA', 'SST12KA', 'SST12KF', 'SST12KFQ THB', 'SST32KF', 'SST32KF THB', 'SST64KA'],
        },
        {
            Department_Name: 'SoC',
            Department_code: 'SOC',
            equipment_Lists: ['I9950CP', 'EX9950C', 'EX9950D'],
        },
        {
            Department_Name: 'CLT',
            Department_code: 'CLT',
            equipment_Lists: ['i7304C'],
        },
    ]);
    const { Groups_Code } = useParams();
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [Detail_Department_Lists, setDetail_Department_Lists] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        Getting_History_Datas();
    }, [Groups_Code, Select_Date_State.value]);

    const Getting_History_Datas = async () => {
        const Getting_History_Datas_Axios = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Detailed_equipment_history', {
            Select_Date_State: Select_Date_State.value,
            Groups_Code,
        });
        if (Getting_History_Datas_Axios.status) {
            setDetail_Department_Lists(Getting_History_Datas_Axios.data);
        }
        setloading(false);
    };
    return (
        <DetailMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <div className="Detail_Group">
                <div className="Detail_Left">
                    <TopContainer
                        DepartMentLists={DepartMentLists}
                        Selector_Value={Selector_Value}
                        setSelector_Value={data => setSelector_Value(data)}
                        Detail_Department_Lists={Detail_Department_Lists}
                    ></TopContainer>
                </div>
                <div className="Detail_Right">
                    <SideContainer
                        Detail_Department_Lists={Detail_Department_Lists}
                        DepartMentLists={DepartMentLists}
                        Selector_Value={Selector_Value}
                    ></SideContainer>
                </div>
            </div>
            <Loader loading={loading}></Loader>
        </DetailMainPageMainDivBox>
    );
};

export default DetailMainPage;
