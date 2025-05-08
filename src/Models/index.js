import { combineReducers } from 'redux';
import Login_Info_Reducer_State from './LoginInfoReducer/LoginInfoReduce';
import Now_Path_Reducer_State from './NowPathReducer/NowPathReduce';
import Equipment_Select_Reducer_State from './EquipmentReducers/Equipment/EquipmentSelectReducer';
import AllEquipmentsReducers_State from './ReduxThunks/AllEquipmentsReducers/AllEquipmentsReducers';

const rootReducer = combineReducers({
    Login_Info_Reducer_State,
    Now_Path_Reducer_State,
    Equipment_Select_Reducer_State,
    AllEquipmentsReducers_State,
});

export default rootReducer;
