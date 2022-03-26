import {
  SHOW_ITEMS_TRANSFER,
  CREATE_ITEMS_TRANSFER,
  FILTER_ITEMS_TRANSFER,
  UPDATE_ITEMS_TRANSFER,
  ERROR_TRANSFERS,
} from "../type";

const initialState = {
  itemTransfers: [],
  error: {},
};

const item_transfer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEMS_TRANSFER:
      return {
        ...state,
        itemTransfers: [action.itemTransfer, ...state.itemTransfers],
      };
    case SHOW_ITEMS_TRANSFER:
      return {
        ...state,
        itemTransfers: action.itemTransfers,
      };
    default:
      return state;
  }
};

export default item_transfer;
