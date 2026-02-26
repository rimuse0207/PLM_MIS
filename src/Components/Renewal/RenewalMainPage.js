import React, { useEffect, useState } from "react";
import { DashboardMainPageMainStyled } from "../Home/Dashboard/DashboardMainpage";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import TopDashboardMainPage from "./TopDashboard/TopDashboardMainPage";
import BottomDashboardMainPage from "./BottomDashboard/BottomDashboardMainPage";
import SideNavigation from "./SideNavi/SideNavigation";
import styled from "styled-components";
import { API_Request_Get_Axios, Request_Get_Axios } from "../../API";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

export const RenewalMainPageMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  height: calc(100% - 80px);
  width: 1920px;
  .NavLeft {
    width: 190px;
    height: calc(100vh - 80px);
    ul {
      li {
        margin-top: 10px;
        border-bottom: 1px solid gray;
        padding: 10px;
        font-size: 1em;
        color: gray;
        font-weight: bold;
      }
    }
  }
  .ContentRight {
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #f2f2f2;
  }
`;
export const diviceNumber = 1000000;
const RenewalMainPage = () => {
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Getting_Axios_Data = async () => {
    setLoading(true);

    const GettingData = await API_Request_Get_Axios(
      "/Dashboard/EIS_RenewalData_For_Dashboards",
      {
        Select_Date_State: Select_Date_State.value,
      },
    );
    console.log(GettingData);
    if (GettingData.status) {
      setTopData(GettingData.data.TopData);
      setBottomData(GettingData.data.BottomData);
    }

    setLoading(false);
  };

  useEffect(() => {
    Getting_Axios_Data();
  }, [Select_Date_State]);

  return (
    <DashboardMainPageMainStyled>
      <NavigationMainPage></NavigationMainPage>

      <RenewalMainPageMainDivBox>
        <div className="ContentRight">
          <TopDashboardMainPage topData={topData}></TopDashboardMainPage>
          <BottomDashboardMainPage
            bottomData={bottomData}
          ></BottomDashboardMainPage>
        </div>
      </RenewalMainPageMainDivBox>
      <Loader loading={loading}></Loader>
    </DashboardMainPageMainStyled>
  );
};

export default RenewalMainPage;
