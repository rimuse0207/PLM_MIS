import React, { useMemo, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import { VscTriangleUp } from "react-icons/vsc";
import { AnimatedItemBox } from "../CompletedOrders/CompletedOrders";
import { diviceNumber } from "../../../RenewalMainPage";
import moment from "moment";
import { useSelector } from "react-redux";

export const SegmentLists = [
  {
    id: "CLT",
    label: "CLT",
    code: "CLT",
    color: "#00c800",
  },
  {
    id: "MBT",
    label: "MBT",
    code: "MBT",
    color: "#0066ff",
  },
  {
    id: "Storage",
    label: "Storage",
    code: "Storage",
    color: "#ff0000",
  },
  {
    id: "DC/Module",
    label: "DC/Module",
    code: "Module",
    color: "#ffc000",
  },
  {
    id: "SoC",
    label: "SoC",
    code: "SoC",
    color: "#6600cc",
  },
];

const AverageRatio = ({ data, subTitle, autoShowing = [], showingIndex }) => {
  const [changeView, setChangeView] = useState(true);
  const safeIndex = Math.min(showingIndex, autoShowing.length - 1);
  const currentItem = autoShowing[safeIndex];
  const SelectDate = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const CalCulData = (Price) => {
    const cal =
      (Number(Price.newOrdersSumPrice) - Number(Price.actualSalesSumPrice)) /
      diviceNumber;
    return cal;
  };

  return (
    <AnnualRevenueMainDivBox onClick={() => setChangeView(!changeView)}>
      {changeView ? (
        <div className="MainContainer">
          <div className="Title">
            <h4>수주 잔고</h4>
          </div>

          <div className="FloatContainer">
            <div className="RightContainer" style={{ width: "100%" }}>
              <div className="MainContent">
                <div className="WorkOrderContainer">
                  <h2>
                    {SelectDate.value === "2024"
                      ? "0"
                      : SelectDate.value === "2025"
                        ? `${(1191920000 / diviceNumber).toFixed(0)}`
                        : CalCulData(data).toFixed(0)}
                    <span style={{ fontSize: "40px" }}>{subTitle}</span>
                  </h2>
                </div>
                <div className="bottomBoard">
                  {currentItem && (
                    <AnimatedItemBox key={showingIndex}>
                      <span className="index-num">{safeIndex + 1} </span>
                      {currentItem.Segment}
                      {"_"}
                      {`${(Number(currentItem.SumPrice) / diviceNumber).toFixed(
                        0,
                      )}`}
                      <strong></strong>
                      <span className="unit">억원</span>
                    </AnimatedItemBox>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="MainContainer"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="Title">
            <h4 style={{ margin: 0 }}>매출 미발생 수주</h4>
          </div>

          {/* flex: 1을 주어 타이틀을 제외한 남은 높이를 꽉 채우고 스크롤을 만듭니다 */}
          <div
            className="TableContentBox"
            style={{
              flex: 1,
              overflowY: "auto",
              height: "auto",
              paddingTop: 0,
              marginTop: "40px",
            }}
          >
            <table className="TableContainer">
              <thead>
                <tr>
                  <td style={{ width: "60%" }}>장비/보드</td>
                  <td>납기월</td>
                  <td>
                    <div>금액</div>
                    <div>(백만원)</div>
                  </td>
                </tr>
              </thead>
              {SelectDate.value === "2024" ? (
                <h4>매출 미발생 수주가 없습니다.</h4>
              ) : SelectDate.value === "2025" ? (
                <tbody>
                  <tr>
                    <td>i2154H_53호기</td>
                    <td>10월</td>
                    <td>750</td>
                  </tr>
                  <tr>
                    <td>DC_Board</td>
                    <td>10월</td>
                    <td>1.9</td>
                  </tr>
                  <tr>
                    <td>S3000P_4호기</td>
                    <td>3월</td>
                    <td>440</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data?.addColumns
                    .filter(
                      (item) =>
                        (Number(item.EXPC_SEL_PRICE) -
                          Number(item.actualSellPrice)) /
                          1000000 >
                        0.1,
                    )
                    ?.map((list) => (
                      <tr key={list.WO_NO}>
                        <td>
                          {list.WO_TYPE === "E" ? (
                            `${list.Models}_${list.CHNG_CONT.split("#")[1]}`
                          ) : (
                            <div>
                              <div>{list.Models}</div>
                              <div>
                                {list.boardName}_{list.QTY}매
                              </div>
                            </div>
                          )}
                        </td>
                        <td>{moment(list.DUE_DT).format("M월")}</td>
                        <td>
                          {Number(
                            (
                              (Number(list.EXPC_SEL_PRICE) -
                                Number(list.actualSellPrice)) /
                              1000000
                            ).toFixed(0),
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </AnnualRevenueMainDivBox>
  );
};
export default AverageRatio;
