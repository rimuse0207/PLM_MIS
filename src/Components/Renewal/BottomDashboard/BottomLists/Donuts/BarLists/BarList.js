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
      height: 22px;
      width: calc(100% - 100px);
      border-radius: 5px;
      position: relative;
      .DivideWhiteLine {
        position: absolute;
        width: 7px;
        height: 22px;
        left: 50%;
        top: 0px;
        z-index: 10;
        background-color: #fff;
      }
    }
    .RealContainer {
      position: absolute;
      top: 5px;
      left: 0px;
      height: 10px;
      background-color: #efefef;
      border-radius: 3px;

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

const BarList = ({
  list,
  ColorNumber,
  BarData = [],
  equipmentData = [],
  boardData = [],
}) => {
  const SelectDate = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const ExceptionTurOver = (SelectData) => {
    if (SelectDate.value === "2024") {
      switch (list.code) {
        case "CLT":
          return Number(4120000000 / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
        default:
          return 0;
      }
    } else if (SelectDate.value === "2025") {
      switch (list.code) {
        case "CLT":
          return Number(Manually_written_sales.CLT / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
        case "MBT":
          return Number(Manually_written_sales.MBT / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
        case "Storage":
          return Number(Manually_written_sales.Storage / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
        case "Module":
          return Number(Manually_written_sales.Module / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
        case "SOC":
          return Number(Manually_written_sales.SOC / diviceNumber)
            .toFixed(1)
            .toLocaleString("ko-KR");
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
        ).toFixed(1);
      }
    }
  };

  const ExceptionPercent = (SelectData) => {
    if (SelectDate.value === "2024") {
      switch (list.code) {
        case "CLT":
          return Number((Number(4120000000) / list.value) * 100).toFixed(1);
        default:
          return 0;
      }
    } else if (SelectDate.value === "2025") {
      switch (list.code) {
        case "CLT":
          return Number(
            (Number(Manually_written_sales.CLT) / list.value) * 100,
          ).toFixed(1);
        case "MBT":
          return Number(
            (Number(Manually_written_sales.MBT) / list.value) * 100,
          ).toFixed(1);

        case "Storage":
          return Number(
            (Number(Manually_written_sales.Storage) / list.value) * 100,
          ).toFixed(1);

        case "Module":
          return Number(
            (Number(Manually_written_sales.Module) / list.value) * 100,
          ).toFixed(1);

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
        ).toFixed(1);
      }
    }
  };

  const ValueReturn = (data) => {
    if (data === 0) {
      return "";
    }
    return data + "%";
  };

  const CalculateWidthPosition = (sumValue, equipValue) => {
    const averValue = equipValue.reduce(
      (pre, acc) => pre + acc.EXPC_SEL_PRICE,
      0,
    );

    if (averValue === 0) {
      return 0;
    }
    return Number((averValue / sumValue) * 100).toFixed(0);

    // return 50;
  };

  return (
    <BarListMainDivBox>
      <h3 style={{ display: "flex", alignItems: "end" }}>
        {list.id}{" "}
        <div style={{ display: "flex", fontSize: "13px", marginLeft: "10px" }}>
          <div>
            장비{" "}
            {equipmentData.filter((item) => item.Segment === list.code).length}
            대
          </div>
          <div
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              color: `${list.color}`,
            }}
          >
            |
          </div>
          <div>
            보드{" "}
            {boardData
              .filter((item) => item.Segment === list.code)
              .reduce((pre, acc) => pre + acc.QTY, 0)}
            매
          </div>
        </div>
      </h3>
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
          >
            {}
            <div
              className="DivideWhiteLine"
              style={
                CalculateWidthPosition(
                  list.value,
                  equipmentData.filter((item) => item.Segment === list.code),
                ) === 0
                  ? { display: "none" }
                  : {
                      left: `${CalculateWidthPosition(
                        list.value,
                        equipmentData.filter(
                          (item) => item.Segment === list.code,
                        ),
                      )}%`,
                    }
              }
            ></div>
          </div>
          <div
            style={{ width: "100px", paddingLeft: "20px", fontSize: "17px" }}
          >
            {Number((list.value / diviceNumber).toFixed(1)).toLocaleString(
              "ko-KR",
            )}
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
