export const EQUIPMENT_SELECT_INFO_REDUCER_GET = 'EQUIPMENT_SELECT_INFO_REDUCER_GET';
export const EQUIPMENT_INITIAL_STATE_SELECT_INFO_REDUCER_GET = 'EQUIPMENT_INITIAL_STATE_SELECT_INFO_REDUCER_GET';

const initState = {
    Equipment_Info: {
        menu_title: '',
        menu_name: '',
        FSC_Code: '',
        menu_show_access: '',
    },
};

export const Selected_Equipment_Info_State_Func = data => ({
    type: EQUIPMENT_SELECT_INFO_REDUCER_GET,
    payload: data,
});
export const Equipment_Select_Inistate_State_Func = () => ({
    type: EQUIPMENT_INITIAL_STATE_SELECT_INFO_REDUCER_GET,
});

const Equipment_Select_Reducer_State = (state = initState, action) => {
    switch (action.type) {
        case EQUIPMENT_SELECT_INFO_REDUCER_GET:
            return {
                ...state,
                Equipment_Info: action.payload,
            };
        case EQUIPMENT_INITIAL_STATE_SELECT_INFO_REDUCER_GET:
            return initState;
        default:
            return state;
    }
};

export default Equipment_Select_Reducer_State;
