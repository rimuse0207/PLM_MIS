import { Request_Get_Axios } from '../../../../API';

export const PIE_DATA_FETCH_DATA_REQUEST = 'PIE_DATA_FETCH_DATA_REQUEST';
export const PIE_DATA_FETCH_DATA_SUCCESS = 'PIE_DATA_FETCH_DATA_SUCCESS';
export const PIE_DATA_FETCH_DATA_FAILURE = 'PIE_DATA_FETCH_DATA_FAILURE';
export const PIE_DATA_RESET = 'PIE_DATA_RESET';

export const fetchDataRequest = () => ({ type: PIE_DATA_FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: PIE_DATA_FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: PIE_DATA_FETCH_DATA_FAILURE, payload: error });

export const Getting_DepartMents_Sell_Equipments_Lists = Select_Date_State => {
    return async dispatch => {
        dispatch(fetchDataRequest()); // 요청 시작
        try {
            const response = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/EIS_Calculate_For_Pie_Graph_Data', {
                Select_Date_State,
            }); // Axios API 호출
            if (response.status) dispatch(fetchDataSuccess(response.data)); // 성공 시 데이터 저장
            else dispatch(fetchDataFailure('error'));
        } catch (error) {
            dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

export const PieDataReset = () => ({
    type: PIE_DATA_RESET,
});

const initialState = {
    loading: false,
    PieData: [],
    error: null,
};

const PieEquipmentsSellThunkReducers = (state = initialState, action) => {
    switch (action.type) {
        case PIE_DATA_FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case PIE_DATA_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, PieData: action.payload };
        case PIE_DATA_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, PieData: [] };
        case PIE_DATA_RESET:
            return { ...state, initialState };
        default:
            return state;
    }
};

export default PieEquipmentsSellThunkReducers;
