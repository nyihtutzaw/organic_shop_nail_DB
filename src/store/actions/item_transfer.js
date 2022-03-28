import {
  SHOW_ITEMS_TRANSFER,
  CREATE_ITEMS_TRANSFER,
  FILTER_ITEMS_TRANSFER,
  UPDATE_ITEMS_TRANSFER,
  ERROR_TRANSFERS,
} from "../type";
import axios from "axios";


export const showItemTransfers = (itemTransfers) => ({
  type: SHOW_ITEMS_TRANSFER,
  itemTransfers: itemTransfers,
});

export const createItemTransfers = (itemTransfer) => ({
  type: CREATE_ITEMS_TRANSFER,
  itemTransfer,
});

export const setTransferErrors = (error) => ({
  type: ERROR_TRANSFERS,
  error
});

export const getItemTransfers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/item-transfers"
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showItemTransfers(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setTransferErrors(error));
      } else {
        dispatch(setTransferErrors(error));
      }
    }
  }
};

export const saveItemTransfers = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/item-transfers/batchInsert",
        data
      );
      console.log(response);
    } catch (error) {
      if (error) {
        dispatch(setTransferErrors(error.response.data.data));
      } else {
        dispatch(setTransferErrors(error.response.data));
      }
    }
  };
};
