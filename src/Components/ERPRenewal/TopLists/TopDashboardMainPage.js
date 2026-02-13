import React from "react";
import { TopDashboardMainPageMainDivBox } from "../../Renewal/TopDashboard/TopDashboardMainPage";
import TopList from "./TopList";

const TopDashboardMainPage = () => {
  const data = [
    {
      title: "Total Inventory Value",
      subTitle: "(KRW Million)",
      price: 17340,
      percent: 1,
      color: "blue",
    },
    {
      title: "Under 1 Year",
      subTitle: "",
      price: 3452,
      percent: 2,
      color: "blue",
    },
    {
      title: "For 1 ~ 3 Years",
      subTitle: "",
      price: 8752,
      percent: 3,
      color: "blue",
    },
    {
      title: "Over 3 Years",
      subTitle: "",
      price: 5163,
      percent: 2,
      color: "red",
    },
    {
      title: "Part Commonality Rate",
      subTitle: "",
      price: "25%",
      percent: 2,
      color: "red",
    },
  ];
  return (
    <TopDashboardMainPageMainDivBox>
      <div className="FirstContainer">
        {data.map((list) => {
          return <TopList data={list}></TopList>;
        })}
      </div>
    </TopDashboardMainPageMainDivBox>
  );
};

export default TopDashboardMainPage;
