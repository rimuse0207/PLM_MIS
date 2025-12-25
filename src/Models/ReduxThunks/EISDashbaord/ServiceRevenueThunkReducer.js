import { API_Request_Get_Axios, Request_Get_Axios } from "../../../API";

export const SERVICE_REVENUE_FETCH_DATA_REQUEST =
  "SERVICE_REVENUE_FETCH_DATA_REQUEST";
export const SERVICE_REVENUE_FETCH_DATA_SUCCESS =
  "SERVICE_REVENUE_FETCH_DATA_SUCCESS";
export const SERVICE_REVENUE_FETCH_DATA_FAILURE =
  "SERVICE_REVENUE_FETCH_DATA_FAILURE";

export const ServiceRevenuefetchDataRequest = () => ({
  type: SERVICE_REVENUE_FETCH_DATA_REQUEST,
});
export const ServiceRevenuefetchDataSuccess = (data) => ({
  type: SERVICE_REVENUE_FETCH_DATA_SUCCESS,
  payload: data,
});
export const ServiceRevenuefetchDataFailure = (error) => ({
  type: SERVICE_REVENUE_FETCH_DATA_FAILURE,
  payload: error,
});

export const Getting_Service_Revenue_Redux_Thunk = (Select_Date_State) => {
  return async (dispatch) => {
    dispatch(ServiceRevenuefetchDataRequest()); // 요청 시작
    try {
      const response = await API_Request_Get_Axios(
        "/Dashboard/EIS_ServiceRevenue_From_ERP",
        {
          Select_Date_State,
        }
      ); // Axios API 호출
      console.log(response);
      if (response.status)
        dispatch(ServiceRevenuefetchDataSuccess(response.data));
      // 성공 시 데이터 저장
      else dispatch(ServiceRevenuefetchDataFailure("error"));
    } catch (error) {
      dispatch(ServiceRevenuefetchDataFailure(error.message)); // 실패 시 에러 저장
    }
  };
};

const initialState = {
  loading: false,
  ServiceRevenue: [
    {
      sumSupplyPrice: 0,
      sumTaxAmount: 0,
      sumPrice: 0,
    },
  ],
  error: null,
};

const ServiceRevenueThunkReducers = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_REVENUE_FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case SERVICE_REVENUE_FETCH_DATA_SUCCESS:
      return { ...state, loading: false, ServiceRevenue: action.payload };
    case SERVICE_REVENUE_FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ServiceRevenue: [
          {
            sumSupplyPrice: 0,
            sumTaxAmount: 0,
            sumPrice: 0,
          },
        ],
      };
    default:
      return state;
  }
};

export default ServiceRevenueThunkReducers;
