import {
  SHOW_MERCHANTS,
  CREATE_MERCHANTS,
  UPDATE_MERCHANTS,
  FILTER_MERCHANTS,
  ERROR_ITEM
} from "../type";

const initialState = {
  merchants: [],
  error: {}
};

const merchant = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MERCHANTS:
      return {
        ...state,
        merchants: [action.merchant, ...state.merchants]
      };
    case SHOW_MERCHANTS:
      return {
        ...state,
        merchants: action.merchants
      };
    case FILTER_MERCHANTS:
      const filterMerchant = state.merchants.filter(
        (merchant) => merchant.id !== action.id
      );
      return {
        ...state,
        merchants: filterMerchant
      };
    case UPDATE_MERCHANTS:
      const index = state.merchants.findIndex(
        (merchant) => merchant.id === action.data.id
      );
      state.merchants[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default merchant;
