import { combineReducers } from "redux";
import Login_Info_Reducer_State from "./LoginInfoReducer/LoginInfoReduce";
import Now_Path_Reducer_State from "./NowPathReducer/NowPathReduce";
import Equipment_Select_Reducer_State from "./EquipmentReducers/Equipment/EquipmentSelectReducer";
import AllEquipmentsReducers_State from "./ReduxThunks/AllEquipmentsReducers/AllEquipmentsReducers";
import Select_Date_Reducer_State from "./SelectDateReducers/SelectDateReducer";
import McAverage_ThunkReducers_State from "./ReduxThunks/EISDashbaord/McAverageThunkReducers";
import Recent_Equipments_ThunkReducers_State from "./ReduxThunks/EISDashbaord/Graphs/RecentEquipmentsThunkReducers";
import Pie_Equipments_Sell_Thunk_Reducers_State from "./ReduxThunks/EISDashbaord/Graphs/PieEquipmentsSellThunkReducers";
import ServiceRevenueThunkReducers_State from "./ReduxThunks/EISDashbaord/ServiceRevenueThunkReducer";
const rootReducer = combineReducers({
  Login_Info_Reducer_State,
  Now_Path_Reducer_State,
  Equipment_Select_Reducer_State,
  AllEquipmentsReducers_State,
  Select_Date_Reducer_State,
  McAverage_ThunkReducers_State,
  Recent_Equipments_ThunkReducers_State,
  Pie_Equipments_Sell_Thunk_Reducers_State,
  ServiceRevenueThunkReducers_State,
});

export default rootReducer;
