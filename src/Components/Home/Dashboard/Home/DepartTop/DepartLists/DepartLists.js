import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaWonSign } from "react-icons/fa6";
import * as XLSX from "xlsx/xlsx.mjs";
import {
  CalculateMCPercent,
  CalculateMCPrice,
  Million,
} from "../../PublicFunc/PublicFunc";

const DepartListsMainDivBox = styled.div`
  border: 1px solid lightgray;
  border-left: 1px solid rgb(0, 202, 255);
  width: 18%;
  height: 170px;
  background-color: #fff;
  box-shadow: -8px 8px 3px -5px lightgray;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 260px;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: #efefef;
  }
  .Price_Container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      width: 60%;
      text-align: center;
    }
  }
  .Money_Containers {
    font-weight: bolder;
    font-size: 1.1em;
    text-align: end;
  }
  .Apper_Container {
    position: absolute;
    right: 10px;
    top: 5px;
    font-weight: bolder;
  }
`;

const DepartLists = ({ list }) => {
  const HandleClicks = () => {
    exportToExcel();
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const filteredParts = list.Part_Price_Calcu.filter((part) =>
      part.ERP_PART.startsWith("R")
    );

    if (filteredParts.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(filteredParts);
      XLSX.utils.book_append_sheet(workbook, worksheet, `ERP PART 단가`);
    }

    const filteredParts2 = list.outSoucingPrice;

    const PriceDivice = filteredParts2.map((list) => {
      return {
        ...list,
        Price: list.CurAmt / list.QTY,
      };
    });

    if (PriceDivice.length > 0) {
      const worksheet2 = XLSX.utils.json_to_sheet(PriceDivice);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet2,
        `ERP 외주 가공비 단가`
      );
    }

    XLSX.writeFile(workbook, `${list.Models}.xlsx`);
  };

  return (
    <DepartListsMainDivBox onDoubleClick={() => HandleClicks()}>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ display: "inline" }}>{list.Segment}</h2>
        <span>({list.WO_TYPE === "B" ? "Board" : "장비"})</span>
      </div>
      <div className="Apper_Container">
        모델명: {list.Models}{" "}
        {list.WO_TYPE === "B"
          ? `(${list.QTY}매)`
          : `#${list.CHNG_CONT.split("#")[1]}`}
      </div>
      <div className="Price_Container">
        <h2 style={{ fontSize: "6vmin" }}>
          {list.MC_Price ? CalculateMCPercent(list).toFixed(1) : 0}%
        </h2>
        <div style={{ width: "40%", borderLeft: "1px solid lightgray" }}>
          <div className="Money_Containers">
            <div
              style={{
                fontSize: "0.8em",
                textAlign: "start",
                marginLeft: "20px",
              }}
            >
              MC
            </div>
            <div>
              &#8361;{" "}
              {Number(CalculateMCPrice(list).toFixed(1)).toLocaleString(
                "ko-KR"
              )}{" "}
              M
            </div>
          </div>
          <div className="Money_Containers" style={{ marginTop: "20px" }}>
            <div
              style={{
                fontSize: "0.8em",
                textAlign: "start",
                marginLeft: "20px",
              }}
            >
              판가
            </div>
            <div>
              &#8361;{" "}
              {Number(
                (list.EXPC_SEL_PRICE / Million).toFixed(1)
              ).toLocaleString("ko-KR")}{" "}
              M
            </div>
          </div>
        </div>
      </div>
    </DepartListsMainDivBox>
  );
};

export default DepartLists;
