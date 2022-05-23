import {
  SHOW_VOUCHERS,
  FILTER_VOUCHERS,
  ERROR_VOUCHERS
} from "../type";

const initialState = {
  vouchers: [],
  voucher: {},
  error: {}
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VOUCHERS:
      return {
        ...state,
        vouchers: action.vouchers
      };
    case FILTER_VOUCHERS:
      const filterVouchers = state.vouchers.filter(
        (v) => v.id !== action.id
      );
      return {
        ...state,
        vouchers: filterVouchers
      };
    case ERROR_VOUCHERS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default item;
