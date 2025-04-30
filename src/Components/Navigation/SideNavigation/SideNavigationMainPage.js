import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillCalendar } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RiListOrdered2 } from 'react-icons/ri';
import { Selected_Equipment_Info_State_Func } from '../../../Models/EquipmentReducers/Equipment/EquipmentSelectReducer';

export const AnnualLeaveNavigationMainPageMainDivBox = styled.div`
    border-right: 1px solid lightgray;
    min-height: calc(100vh - 80px);
    background-color: skyblue;
    width: 200px;
    li {
        padding: 10px;
        border: 1px solid lightgray;
        &:hover {
            cursor: pointer;
            background-color: #e3e3e3;
        }
    }
`;

const SideNavigationMainPage = ({ NavState, setHistoryPageOpen }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const Navigate = useNavigate();
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [User_Side_Menu_List, setUser_Side_Menu_List] = useState([
        {
            Menu_Select: 'Equipment',
            Menu_List: [
                {
                    menu_name: 'S3000P',
                    FSC_Code: 'AASN-001',
                    menu_path: '/Equipment',
                    menu_title: '/Equiment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
                {
                    menu_name: 'S1610',
                    FSC_Code: 'AASN-002',
                    menu_path: '/Equipment',
                    menu_title: '/Equipment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
                {
                    menu_name: 'i7340C',
                    FSC_Code: 'ACI7-001',
                    menu_path: '/Equipment',
                    menu_title: '/Equipment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
                {
                    menu_name: 'SST32KA',
                    FSC_Code: 'BEG5-001',
                    menu_path: '/Equipment',
                    menu_title: '/Equipment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
                {
                    menu_name: 'i9950CP',
                    FSC_Code: 'CFCI-001',
                    menu_path: '/Equipment',
                    menu_title: '/Equipment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
                {
                    menu_name: 'i21454H',
                    FSC_Code: 'ADI2-001',
                    menu_path: '/Equipment',
                    menu_title: '/Equipment',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
            ],
        },
    ]);
    const [Admin_Side_Menu_List, setAdmin_Side_Menu_List] = useState([
        {
            Menu_Select: 'Tool',
            Menu_List: [
                {
                    menu_name: '관리자 Tool 리스트',
                    menu_path: '/Tool/Administrator/Select',
                    menu_title: '/Tool',
                    menu_show_access: 'admin',
                    menu_icon: <RiListOrdered2 />,
                },
            ],
        },
        {
            Menu_Select: 'board',
            Menu_List: [
                {
                    menu_name: '관리자 Tool 리스트',
                    menu_path: '/Tool/Administrator/Select',
                    menu_title: '/Tool',
                },
            ],
        },
    ]);

    const Select_Model_Equiment = Select_Equiment => {
        dispatch(Selected_Equipment_Info_State_Func(Select_Equiment));
    };

    return (
        <AnnualLeaveNavigationMainPageMainDivBox>
            <ul>
                {User_Side_Menu_List.map(item => {
                    return item.Menu_List.map(list => {
                        return (
                            <li key={list.menu_name} onClick={() => Select_Model_Equiment(list)}>
                                {list.menu_name}
                            </li>
                        );
                    });
                })}
            </ul>
        </AnnualLeaveNavigationMainPageMainDivBox>
    );
};
export default SideNavigationMainPage;
