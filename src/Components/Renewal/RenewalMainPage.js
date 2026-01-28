import React from "react";
import { DashboardMainPageMainStyled } from "../Home/Dashboard/DashboardMainpage";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import TopDashboardMainPage from "./TopDashboard/TopDashboardMainPage";
import BottomDashboardMainPage from "./BottomDashboard/BottomDashboardMainPage";

const RenewalMainPage = () => {
  return (
    <DashboardMainPageMainStyled>
      <NavigationMainPage></NavigationMainPage>

      <TopDashboardMainPage></TopDashboardMainPage>
      <BottomDashboardMainPage></BottomDashboardMainPage>
    </DashboardMainPageMainStyled>
  );
};

export default RenewalMainPage;
