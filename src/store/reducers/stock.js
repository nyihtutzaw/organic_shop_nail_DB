import {
  SHOW_STOCKS,
  SHOW_STOCK,
  FILTER_STOCKS,
  UPDATE_STOCKS,
  CREATE_PURCHASES,
  ERROR_STOCKS
} from "../type";

const initialState = {
  stocks: [],
  stock: {},
  error: []
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PURCHASES:
      return {
        purchases: [...state.purchases, action.purchase]
      };
    case SHOW_STOCKS:
      return {
        ...state,
        stocks: action.stocks,
        error: [],
      };
    case SHOW_STOCK:
      return {
        ...state,
        stock: action.stock,
        error: []
      };
    case FILTER_STOCKS:
      const filterStocks = state.stocks.filter(
        (stock) => stock.id !== action.id
      );
      return {
        ...state,
        stocks: filterStocks
      };
    case UPDATE_STOCKS:
      const index = state.stocks.findIndex((s) => s.id === action.data.id);
      state.stocks[index] = action.data;
      return {
        ...state
      };
    case ERROR_STOCKS:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    default:
      return state;
  }
};

export default item;
