import {
  SHOW_STAFFS,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS,
  IS_SUCCESS_STAFFS,
  CLEAR_ALERT_STAFFS
} from "../type";

const initialState = {
  staffs: [],
  error: [],
  isSuccess: false
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STAFFS:
      return {
        staffs: [action.staff, ...state.staffs],
        isSuccess: true,
        error: []
      };
    case SHOW_STAFFS:
      return {
        ...state,
        staffs: action.staffs
      };
    case FILTER_STAFFS:
      const filterStaffs = state.staffs.filter(
        (staff) => staff.id !== action.id
      );
      return {
        ...state,
        staffs: filterStaffs,
        error: [],
        isSuccess: true
      };
    case UPDATE_STAFFS:
      const index = state.staffs.findIndex(
        (staff) => staff.id === action.data.id
      );
      state.staffs[index] = action.data;
      return {
        ...state,
        error: [],
        isSuccess: true
      };
    case ERROR_STAFFS:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    case IS_SUCCESS_STAFFS:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case CLEAR_ALERT_STAFFS:
      return {
        ...state,
        error: [],
        isSuccess: false
      };
    default:
      return state;
  }
};

export default item;
