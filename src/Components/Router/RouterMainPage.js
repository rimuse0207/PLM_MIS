import React, { useState } from 'react';
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';

import LoginRoute from './LoginRoute/LoginRouteMainPage';
import { useSelector } from 'react-redux';
import EquimentMcMainPage from '../Home/EquimentMc/EquimentMcMainPgae';
import EquimentListsMainPage from '../Home/EquimentLists/EquimentListsMainPage';
import ExhalationMainPage from '../Home/EquimentLists/Exhalation/ExhalationMainPage';
import BomListsMainPage from '../Home/BOMLists/BomListsMainPage';
import DashboardMainPage from '../Home/Dashboard/DashboardMainpage';
import DetailMainPage from '../Home/Dashboard/Detail/DetailMainPage';
import StockMainPage from '../Home/Stock/StockMainPage';
import StockDetailMainPage from '../Home/Stock/SotckDetail/StockDetailMainPage';

const RouterMainPage = () => {
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
    ]);

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
