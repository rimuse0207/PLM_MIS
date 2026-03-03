import React, { useEffect } from "react";
import { CompletedOrdersMainDivBox } from "../../../../TopDashboard/TopLists/CompletedOrders/CompletedOrders";
import styled from "styled-components";
import { ColorArray } from "../../../BottomDashboardMainPage";
import { diviceNumber } from "../../../../RenewalMainPage";
import { useSelector } from "react-redux";

const BarListMainDivBox = styled.div`
  width: 100%;
  .TableContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .BackgroundContainer {
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
    .ActualContainer {
      background-color: green;
      height: 10px;
      width: calc(100% - 100px);
      position: relative;
    }
    .RealContainer {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 10px;
      background-color: #efefef;
      .PercentContainer {
        font-size: 12px;
        position: absolute;
        bottom: -15px;
        right: -0px;
      }
    }
    .TextContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      background-color: none;
      position: absolute;
      top: 0px;
      left: 0px;

      div {
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bolder;
        font-size: 1.2em;
      }
    }
  }
`;

const Manually_written_sales = {
  CLT: 50549360000,
  MBT: 6485388264,
  Storage: 345805104,
  Module: 940816455,
  SOC: 0,
};

const BarList = ({ list, ColorNumber, BarData = [] }) => {
  const SelectDate = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const ExceptionTurOver = (SelectData) => {
    if (SelectDate.value === "2025") {
      switch (list.code) {
        case "CLT":
          return Math.round(
            Manually_written_sales.CLT / diviceNumber,
          ).toLocaleString("ko-KR");
        case "MBT":
          return Math.round(
            Manually_written_sales.MBT / diviceNumber,
          ).toLocaleString("ko-KR");
        case "Storage":
          return Math.round(
            Manually_written_sales.Storage / diviceNumber,
          ).toLocaleString("ko-KR");
        case "Module":
          return Math.round(
            Manually_written_sales.Module / diviceNumber,
          ).toLocaleString("ko-KR");
        case "SOC":
          return Math.round(
            Manually_written_sales.SOC / diviceNumber,
          ).toLocaleString("ko-KR");
        default:
          return 0;
      }
    } else {
      if (
        Number(
          SelectData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0),
        ) === 0
      ) {
        return 0;
      } else {
        return Number(
          (Number(
            SelectData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0),
          ) /
            list.value) *
            100,
        ).toFixed(0);
      }
    }
  };

  const ExceptionPercent = (SelectData) => {
    if (SelectDate.value === "2025") {
      switch (list.code) {
        case "CLT":
          return Number(
            (Number(Manually_written_sales.CLT) / list.value) * 100,
          ).toFixed(0);
        case "MBT":
          return Number(
            (Number(Manually_written_sales.MBT) / list.value) * 100,
          ).toFixed(0);

        case "Storage":
          return Number(
            (Number(Manually_written_sales.Storage) / list.value) * 100,
          ).toFixed(0);

        case "Module":
          return Number(
            (Number(Manually_written_sales.Module) / list.value) * 100,
          ).toFixed(0);

        case "SOC":
          return 0;
        default:
          return 0;
      }
    } else {
      if (
        Number(
          SelectData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0),
        ) === 0
      ) {
        return 0;
      } else {
        return Number(
          (Number(
            SelectData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0),
          ) /
            list.value) *
            100,
        ).toFixed(0);
      }
    }
  };

  const ValueReturn = (data) => {
    if (data === 0) {
      return "";
    }
    return data + "%";
  };

  return (
    <BarListMainDivBox>
      <h3>{list.id}</h3>
      <div className="BackgroundContainer">
        <div className="TableContainer">
          <div
            className="ActualContainer"
            style={{
              backgroundColor:
                Math.round(list.value / diviceNumber) === 0
                  ? "#fff"
                  : list.color,
            }}
          ></div>
          <div
            style={{ width: "100px", paddingLeft: "20px", fontSize: "14px" }}
          >
            {Math.round(list.value / diviceNumber).toLocaleString("ko-KR")}
          </div>
        </div>
        <div className="TableContainer">
          <div
            className="ActualContainer"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <div
              className="RealContainer"
              style={{
                backgroundColor:
                  ExceptionTurOver(BarData) === 0 ? "#fff" : "#efefef",
                width: `${ExceptionPercent(BarData)}%`,
              }}
            >
              <div className="PercentContainer">
                {ValueReturn(ExceptionPercent(BarData))}
              </div>
            </div>
          </div>

          <div
            style={{ width: "100px", paddingLeft: "20px", fontSize: "14px" }}
          >
            {ExceptionTurOver(BarData)}
          </div>
        </div>
      </div>
    </BarListMainDivBox>
  );
};

export default BarList;
