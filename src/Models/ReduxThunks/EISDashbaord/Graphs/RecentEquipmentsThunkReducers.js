import { Request_Get_Axios } from '../../../../API';

export const BAR_DATA_FETCH_DATA_REQUEST = 'BAR_DATA_FETCH_DATA_REQUEST';
export const BAR_DATA_FETCH_DATA_SUCCESS = 'BAR_DATA_FETCH_DATA_SUCCESS';
export const BAR_DATA_FETCH_DATA_FAILURE = 'BAR_DATA_FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({ type: BAR_DATA_FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: BAR_DATA_FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: BAR_DATA_FETCH_DATA_FAILURE, payload: error });

export const Getting_Top6_Recent_Sell_Equipments_Lists = Select_Date_State => {
    return async dispatch => {
        dispatch(fetchDataRequest()); // 요청 시작
        try {
            const response = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/EIS_Calculate_For_Bar_Graph_Data', {
                Select_Date_State,
            }); // Axios API 호출
            if (response.status) dispatch(fetchDataSuccess(response.data)); // 성공 시 데이터 저장
            else dispatch(fetchDataFailure('error'));
        } catch (error) {
            dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

const initialState = {
    loading: false,
    BarData: [],
    error: null,
};

const RecentEquipmentsThunkReducers = (state = initialState, action) => {
    switch (action.type) {
        case BAR_DATA_FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case BAR_DATA_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, BarData: action.payload };
        case BAR_DATA_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, BarData: [] };
        default:
            return state;
    }
};

export default RecentEquipmentsThunkReducers;
