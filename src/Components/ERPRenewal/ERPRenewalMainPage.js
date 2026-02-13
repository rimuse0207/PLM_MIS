import React from "react";
import { DashboardMainPageMainStyled } from "../Home/Dashboard/DashboardMainpage";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import TopDashboardMainPage from "./TopLists/TopDashboardMainPage";
import SideNavigation from "../Renewal/SideNavi/SideNavigation";
import Loader from "../../Loader/Loader";
import { RenewalMainPageMainDivBox } from "../Renewal/RenewalMainPage";
import BottomDashboardMainPage from "./BottomLists/BottomDashboardMainPage";

const ERPRenewalMainPage = () => {
  const loading = false;
  return (
    <DashboardMainPageMainStyled>
      <NavigationMainPage></NavigationMainPage>

      <RenewalMainPageMainDivBox>
        <div className="NavLeft">
          <SideNavigation></SideNavigation>
        </div>
        <div className="ContentRight">
          <TopDashboardMainPage></TopDashboardMainPage>
          <BottomDashboardMainPage></BottomDashboardMainPage>
        </div>
      </RenewalMainPageMainDivBox>
      <Loader loading={loading}></Loader>
    </DashboardMainPageMainStyled>
  );
};

export default ERPRenewalMainPage;
