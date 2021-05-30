import { DOCTORS_SPECIALITIES, GET_DOCTORS, FILTER_C, TOGGLE_APPOINT, MY_APPOINTMENTS, GET_PATIENTS } from "../actions/types";

const initialState = {
    spec: [],
    doc: [],
    patients: [],
    filter_c: "",
    model_appoint: false,
    appoint_doc: {},
    my_appointments: []
};

const data_reducer = (state = initialState, action) => {
    switch (action.type){
        case DOCTORS_SPECIALITIES:
            return { ...state, spec: action.payload, filter_c:""};
        case GET_DOCTORS:
            return { ...state, doc: action.payload};
        case GET_PATIENTS:
            return { ...state, patients: action.payload};
        case FILTER_C:
            return { ...state, filter_c: action.payload};
        case TOGGLE_APPOINT:
            return { ...state, model_appoint: !state.model_appoint, appoint_doc:action.payload};
        case MY_APPOINTMENTS:
            return { ...state, my_appointments: action.payload};
        default:
            return state;
    }
};
export default data_reducer;