import moment from 'moment';

export const SELECT_DATE_REDUCER_GETTING = 'SELECT_DATE_REDUCER_GET';
export const CHANGE_DATE_REDUCER_PUT = 'CHANGE_DATE_REDUCER_PUT';

const initState = {
    Select_Date_State: {
        value: moment().format('YYYY'),
        label: `${moment().format('YYYY')}년`,
    },
};

export const Changed_Select_Date_Info_State_Func = data => ({
    type: CHANGE_DATE_REDUCER_PUT,
    payload: data,
});

const Select_Date_Reducer_State = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_DATE_REDUCER_PUT:
            return {
                ...state,
                Select_Date_State: action.payload,
            };
        default:
            return state;
    }
};

export default Select_Date_Reducer_State;
