import { Request_Get_Axios } from '../../../API';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: FETCH_DATA_FAILURE, payload: error });

export const AllEquipmentsfetchData = () => {
    console.log('실행2');
    return async dispatch => {
        dispatch(fetchDataRequest()); // 요청 시작

        try {
            console.log('실행2');
            const response = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Getting_Equiment_Models_Lists'); // Axios API 호출
            if (response.data) dispatch(fetchDataSuccess(response.data.Add_BOM_Lists_EQ_NO)); // 성공 시 데이터 저장
            else dispatch(fetchDataFailure('error'));
        } catch (error) {
            dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const AllEquipmentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, data: [] };
        default:
            return state;
    }
};

export default AllEquipmentsReducers;
