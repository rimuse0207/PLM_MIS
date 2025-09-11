import { Request_Get_Axios } from '../../../API';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: FETCH_DATA_FAILURE, payload: error });

export const Getting_MC_average_compared_to_sales_price_by_sector = Select_Date_State => {
    return async dispatch => {
        dispatch(fetchDataRequest()); // 요청 시작
        try {
            const response = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/EIS_Calculate_For_Data', {
                Select_Date_State,
            }); // Axios API 호출

            if (response.data) dispatch(fetchDataSuccess(response.data)); // 성공 시 데이터 저장
            else dispatch(fetchDataFailure('error'));
        } catch (error) {
            dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

const initialState = {
    loading: false,
    DepartMentLists: [],
    error: null,
};

const McAverageThunkReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, DepartMentLists: action.payload };
        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, DepartMentLists: [] };
        default:
            return state;
    }
};

export default McAverageThunkReducers;
