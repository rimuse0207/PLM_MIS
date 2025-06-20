import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import EquimentListsMainPage from '../../Home/EquimentLists/EquimentListsMainPage';
import { Changed_Select_Date_Info_State_Func } from '../../../Models/SelectDateReducers/SelectDateReducer';
import Select from '@mui/material/Select';
import ReactSelect from 'react-select';
import { Request_Get_Axios } from '../../../API';

const NavigationMainPageMainDivBox = styled.div`
    position: sticky;
    height: 80px;
    width: 100%;
    border-bottom: 4px solid #dadce0;
    z-index: 2;
    background: white;
    background-color: #fff;
    .NavigationMainFlexdiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        margin: 0 auto;
        padding-left: 30px;
    }
    .Navigation_Icons {
        width: 60px;
        height: 60px;
        background-color: lightgray;
        border-radius: 50%;
        background-size: cover;
        box-shadow: 0px 0px 3px 5px lightgray;
        background-repeat: repeat;
        background-position-y: center;

        svg {
            padding: 10px;
            width: 100%;
            height: 100%;
            color: darkgray;
        }
    }
    .Main_Logo_Container {
        position: relative;
        .Select_Containers {
            position: absolute;
            right: -350px;
            width: 300px;
            top: 0px;
        }
        .Main_Menu_Move_Container {
            position: absolute;
            right: -400px;
            top: 0px;
            width: 300px;
        }
    }
`;

export const MenuContainer = styled.div`
    position: relative;
`;

const UserButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: none;
    background: transparent;
`;

const UserImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ccc;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: -10px;
    margin-top: 50px;

    width: 150px;
    background: lightgray;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 10;
`;

export const MenuItemss = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    text-align: left;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
        background: #f5f5f5;
    }
`;

const Icon = styled.span`
    margin-right: 8px;
    display: flex;
    align-items: center;
`;

const TopNavigationMainPage = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const User_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [open, setOpen] = useState(false);
    const [CalculDate, setCalCulDate] = useState('');
    const options = [
        { value: '2024', label: '2024년' },
        { value: '2025', label: '2025년' },
    ];

    const Handle_Change_Move_To_Go = e => {
        Navigate(e.target.value);
    };

    const Getting_CalculDate = async () => {
        const Getting_CalculDate_Axios = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Getting_CalculDate');
        if (Getting_CalculDate_Axios.status) {
            console.log(Getting_CalculDate_Axios);
            setCalCulDate(Getting_CalculDate_Axios.data);
        }
    };

    useEffect(() => {
        Getting_CalculDate();
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NavigationMainPageMainDivBox>
            <div className="NavigationMainFlexdiv">
                <div className="Main_Logo_Container">
                    <Link to={`${location.pathname.startsWith('/ERP/Stock/Part') ? '/ERP/Stock/Part' : '/'}`}>
                        <img src="/01_EXICON_CYMK_FULL-COLOR.PNG" width="140px"></img>
                    </Link>

                    <div className="Select_Containers">
                        <ReactSelect
                            value={Select_Date_State}
                            options={options}
                            onChange={e => dispatch(Changed_Select_Date_Info_State_Func(e))}
                        />
                    </div>
                </div>
                {CalculDate ? (
                    <div style={{ marginRight: '50px', color: 'rgb(0,202,255)' }}>
                        기준일시: {moment(CalculDate).format('YYYY.MM.DD')} 09:06:00{' '}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </NavigationMainPageMainDivBox>
    );
};

export default TopNavigationMainPage;
