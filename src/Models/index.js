import { combineReducers } from 'redux';
import Login_Info_Reducer_State from './LoginInfoReducer/LoginInfoReduce';
import Now_Path_Reducer_State from './NowPathReducer/NowPathReduce';
import Equipment_Select_Reducer_State from './EquipmentReducers/Equipment/EquipmentSelectReducer';

const rootReducer = combineReducers({ Login_Info_Reducer_State, Now_Path_Reducer_State, Equipment_Select_Reducer_State });

export default rootReducer;
