import React, { useEffect, useState } from 'react';
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';

import LoginRoute from './LoginRoute/LoginRouteMainPage';
import { useDispatch, useSelector } from 'react-redux';
import EquimentMcMainPage from '../Home/EquimentMc/EquimentMcMainPgae';
import EquimentListsMainPage from '../Home/EquimentLists/EquimentListsMainPage';
import ExhalationMainPage from '../Home/EquimentLists/Exhalation/ExhalationMainPage';
import BomListsMainPage from '../Home/BOMLists/BomListsMainPage';
import DashboardMainPage from '../Home/Dashboard/DashboardMainpage';
import DetailMainPage from '../Home/Dashboard/Detail/DetailMainPage';
import StockMainPage from '../Home/Stock/StockMainPage';
import StockDetailMainPage from '../Home/Stock/SotckDetail/StockDetailMainPage';
import DashboardMainPageSub from '../../Components/Home/DashboardCopy/DashboardMainpage';
import { Getting_Top6_Recent_Sell_Equipments_Lists } from '../../Models/ReduxThunks/EISDashbaord/Graphs/RecentEquipmentsThunkReducers';
import { Getting_MC_average_compared_to_sales_price_by_sector } from '../../Models/ReduxThunks/EISDashbaord/McAverageThunkReducers';
import {
    Getting_DepartMents_Sell_Equipments_Lists,
    PieDataReset,
} from '../../Models/ReduxThunks/EISDashbaord/Graphs/PieEquipmentsSellThunkReducers';
const RouterMainPage = () => {
    const dispatch = useDispatch();
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const User_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [RouterInfo, setRouterInfo] = useState([
        {
            path: '/',
            element: <DashboardMainPage></DashboardMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Detail/:Groups_Code',
            element: <DetailMainPage></DetailMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Before',
            element: <EquimentListsMainPage></EquimentListsMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Select/Detail/Equipment/:Model_Name',
            element: <ExhalationMainPage></ExhalationMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Select/BOM/Lists/:Type/:Model_Name/:FSC_CODE/:EQ_NO',
            element: <BomListsMainPage></BomListsMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/ERP/Stock/Part',
            element: <StockMainPage></StockMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/ERP/Stock/Part/Detail/Table',
            element: <StockDetailMainPage></StockDetailMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Sub/EIS',
            element: <DashboardMainPageSub></DashboardMainPageSub>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
    ]);
    // useEffect(() => {
    //     dispatch(Getting_Top6_Recent_Sell_Equipments_Lists(Select_Date_State.value));
    // }, []);
    useEffect(() => {
        dispatch(PieDataReset());
        dispatch(Getting_MC_average_compared_to_sales_price_by_sector(Select_Date_State.value));
        dispatch(Getting_DepartMents_Sell_Equipments_Lists(Select_Date_State.value));
    }, [Select_Date_State.value]);
    return (
        <BrowserRouter>
            <Routes>
                {RouterInfo.map(route => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <LoginRoute
                                    withAdminAuthorization={route.withAdminAuthorization}
                                    withAuthorization={route.withAuthorization}
                                    component={route.element}
                                    User_Info={User_Info}
                                ></LoginRoute>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default RouterMainPage;
