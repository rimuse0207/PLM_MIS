import React, { useEffect, useState } from "react";

import Donuts from "./GraphsLists/Donuts";
import Bars from "./GraphsLists/Bars";

import styled from "styled-components";
import { Request_Get_Axios } from "../../../../../API";
import { Getting_Top6_Recent_Sell_Equipments_Lists } from "../../../../../Models/ReduxThunks/EISDashbaord/Graphs/RecentEquipmentsThunkReducers";
import { useDispatch, useSelector } from "react-redux";
import ClipLoaders from "../../../../../Loader/ClipLoader";
import moment from "moment";

const GraphsMainPageMainDivBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .Graph_Container_GR {
    border: 1px solid lightgray;
    height: calc(100vh - 350px);
    background-color: #fff;
    box-shadow: -8px 8px 3px -5px lightgray;
    border-top: 4px solid rgb(0, 202, 255);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    position: relative;
    .Select_Group {
      position: absolute;
      top: 10px;
      display: flex;
      justify-content: space-between;
      width: 90%;
      z-index: 10000;
      left: 40px;
      h3 {
        font-size: 1.5em;
        font-weight: bolder;
      }
      .Unit_Container {
        position: absolute;
        top: 40px;
        right: 0px;
        font-weight: bolder;
      }
    }
  }

  .Select_Buttons {
    position: absolute;
    top: 40px;
    left: 0px;
    .NowSelected {
      opacity: 1;
      border: 2px solid blue;
    }
    button {
      width: 60px;
      height: 40px;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin-right: 10px;
      background-color: #fff;
      font-size: 16px;
      font-weight: bolder;
      opacity: 0.5;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const GraphsMainPage = () => {
  const Pie_State = useSelector(
    (state) => state.Pie_Equipments_Sell_Thunk_Reducers_State
  );
  const DepartMentLists_State = useSelector(
    (state) => state.McAverage_ThunkReducers_State
  );
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State
  );
  const [ClickData, setClickData] = useState(null);
  const [Bar_State, setBar_State] = useState([]);
  const [Pie_State_By_Selector, setPie_State_By_Selector] = useState([]);
  const [NowSelectGraphButton, setNowSelectGraphButton] = useState("Equipment");

  const [Select_Value, setSelect_Value] = useState("ALL");
  const [Pie_Selector_List, setPie_Selector_List] = useState([
    {
      value: "ALL",
      label: "전체",
    },
    {
      value: "Module",
      label: "DC/Module",
    },
    {
      value: "MBT",
      label: "MBT",
    },
    {
      value: "Storage",
      label: "Storage",
    },
    {
      value: "SoC",
      label: "SOC",
    },
    {
      value: "CLT",
      label: "CLT",
    },
  ]);
  const HandleChangeOptions = (e) => {
    e.preventDefault();

    setSelect_Value(e.target.value);
  };

  useEffect(() => {
    if (Select_Value === "ALL") {
      setPie_State_By_Selector(Pie_State.PieData);
    } else {
      Grouping_Data();
    }
  }, [Select_Value, Select_Date_State.value, Pie_State.PieData]);

  useEffect(() => {
    setClickData(null);
  }, [Select_Date_State.value]);

  useEffect(() => {
    if (DepartMentLists_State) {
      if (DepartMentLists_State?.DepartMentLists.length > 0) {
        setBar_State(
          DepartMentLists_State?.DepartMentLists.filter(
            (item) => item.Segment === ClickData || item.Models === ClickData
          ).map((list) => {
            return {
              id: list.WO_NO,
              equipments: `${list.Models}`,
              MC: Number(
                (list.MC_Price / list.EXPC_SEL_PRICE) * list.QTY * 100 > 100
                  ? (list.MC_Price + list.outSoucingPriceSum) / 1000000
                  : (list.MC_Price * list.QTY + list.outSoucingPriceSum) /
                      1000000
              ),
              price: list.EXPC_SEL_PRICE / 1000000,
              dueDate: list.DUE_DT,
              WO_TYPE: list.WO_TYPE,
              QTY: list.QTY,
              CHNG_CONT: list.CHNG_CONT,
            };
          })
        );
      } else {
        setBar_State([]);
      }
    } else {
      setBar_State([]);
    }
  }, [DepartMentLists_State.DepartMentLists, ClickData]);

  const Grouping_Data = () => {
    const Grouping_Models = [];
    const datas = Pie_State.PieData.map((list) => {
      if (list.code === Select_Value) {
        return list.Lists.map((item) => {
          return Grouping_Models.push(item.Models);
        });
      }
    });
    const Delete_Duple_Data = [...new Set(Grouping_Models)];

    const Pies_data = Delete_Duple_Data.map((list) => {
      const [abc] = Pie_State.PieData.filter(
        (items) => items.code === Select_Value
      );
      return {
        id: list,
        label: list,
        code: list,
        value: abc.Lists.filter((items) => items.Models === list).reduce(
          (pre, acc) => pre + acc.EXPC_SEL_PRICE / 1000000,
          0
        ),
      };
    });
    setPie_State_By_Selector(Pies_data);
  };

  return (
    <GraphsMainPageMainDivBox>
      <div className="Graph_Container_GR" style={{ width: "38%" }}>
        {/* <h3>매출액({Pie_State_By_Selector.reduce((pre, acc) => pre + acc.value, 0).toLocaleString('ko-kr')} M)</h3> */}
        <div className="Select_Group">
          <h3>
            {moment(Select_Date_State.value).format("YY")}년 수주액{" "}
            <span style={{ color: "blue", fontSize: "0.8em" }}>
              {" "}
              :{" "}
              {Pie_State_By_Selector.reduce(
                (pre, acc) => pre + acc.value,
                0
              ).toLocaleString("ko-kr")}{" "}
              M
            </span>
          </h3>
          <select
            className="Select_Container"
            onChange={(e) => HandleChangeOptions(e)}
            value={Select_Value}
          >
            {Pie_Selector_List.map((list) => {
              return (
                <option key={list.value} value={list.value}>
                  {list.label}
                </option>
              );
            })}
          </select>
          <div className="Unit_Container">단위 : 원(&#8361;)</div>
        </div>

        {Pie_State.loading ? (
          <ClipLoaders loading={Pie_State.loading}></ClipLoaders>
        ) : (
          <Donuts
            Pie_State={Pie_State_By_Selector.filter((item) => item.value > 0)}
            setClickData={(data) => setClickData(data)}
          ></Donuts>
        )}

        {/* {Pie_State_By_Selector.length > 0 ? (
                    <Donuts Pie_State={Pie_State_By_Selector.filter(item => item.value > 0)}></Donuts>
                ) : (
                    <></>
                )} */}
      </div>
      <div className="Graph_Container_GR" style={{ width: "58%" }}>
        <div className="Select_Group">
          <h3>{ClickData} 최근 판매 제품 판가 및 MC</h3>
          <div className="Select_Buttons">
            <button
              className={
                NowSelectGraphButton === "Equipment" && ClickData
                  ? "NowSelected"
                  : ""
              }
              onClick={() => setNowSelectGraphButton("Equipment")}
            >
              {" "}
              장 비{" "}
            </button>
            <button
              className={
                NowSelectGraphButton === "Board" && ClickData
                  ? "NowSelected"
                  : ""
              }
              onClick={() => setNowSelectGraphButton("Board")}
            >
              {" "}
              보 드{" "}
            </button>
          </div>
        </div>
        {Bar_State.loading ? (
          <ClipLoaders loading={Bar_State.loading}></ClipLoaders>
        ) : (
          <Bars
            Bar_State={Bar_State}
            NowSelectGraphButton={NowSelectGraphButton}
          ></Bars>
        )}
      </div>
    </GraphsMainPageMainDivBox>
  );
};

export default GraphsMainPage;
