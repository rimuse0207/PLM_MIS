import React, { useEffect } from "react";
import NavigationMainPage from "../../Navigation/NavigationMainPage";
import styled from "styled-components";
import DepartTopMainPage from "./Home/DepartTop/DepartTopMainpage";
import GraphsMainPage from "./Home/Graphs/GraphsMainPage";
import { Request_Get_Axios } from "../../../API";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader/Loader";
import { Getting_MC_average_compared_to_sales_price_by_sector } from "../../../Models/ReduxThunks/EISDashbaord/McAverageThunkReducers";
import {
  Getting_DepartMents_Sell_Equipments_Lists,
  PieDataReset,
} from "../../../Models/ReduxThunks/EISDashbaord/Graphs/PieEquipmentsSellThunkReducers";
import { Getting_Top6_Recent_Sell_Equipments_Lists } from "../../../Models/ReduxThunks/EISDashbaord/Graphs/RecentEquipmentsThunkReducers";
import { Getting_Service_Revenue_Redux_Thunk } from "../../../Models/ReduxThunks/EISDashbaord/ServiceRevenueThunkReducer";

const DashboardMainPageMainStyled = styled.div`
  background-color: #efefef;
  min-height: 100vh;
  width: 100%;
  overflow: auto;
  min-width: 1920px;
`;

const DashboardMainPage = () => {
  const dispatch = useDispatch();
  const DepartMentLists_State = useSelector(
    (state) => state.McAverage_ThunkReducers_State
  );
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State
  );
  useEffect(() => {
    // dispatch(Getting_Top6_Recent_Sell_Equipments_Lists(Select_Date_State.value));
  }, []);
  useEffect(() => {
    dispatch(PieDataReset());
    dispatch(
      Getting_MC_average_compared_to_sales_price_by_sector(
        Select_Date_State.value
      )
    );
    dispatch(
      Getting_DepartMents_Sell_Equipments_Lists(Select_Date_State.value)
    );
    dispatch(Getting_Service_Revenue_Redux_Thunk(Select_Date_State.value));
  }, [Select_Date_State.value]);
  return (
    <DashboardMainPageMainStyled>
      <NavigationMainPage></NavigationMainPage>
      <div>
        <DepartTopMainPage></DepartTopMainPage>
      </div>
      <div>
        <GraphsMainPage></GraphsMainPage>
      </div>
      <Loader loading={DepartMentLists_State.loading}></Loader>
    </DashboardMainPageMainStyled>
  );
};

export default DashboardMainPage;
