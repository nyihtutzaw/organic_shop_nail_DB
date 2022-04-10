import {
  SHOW_ITEMS_TRANSFER,
  SHOW_TRANSFER,
  CREATE_ITEMS_TRANSFER,
  FILTER_ITEMS_TRANSFER,
  UPDATE_ITEMS_TRANSFER,
  ERROR_TRANSFERS,
} from "../type";
import axios from "axios";
import { apiUrl } from "../../constants/url";

export const showItemTransfers = (itemTransfers) => ({
  type: SHOW_ITEMS_TRANSFER,
  itemTransfers: itemTransfers,
});

export const showItemTransfer = (itemTransfer) => ({
  type: SHOW_TRANSFER,
  itemTransfer: itemTransfer,
});

export const createItemTransfers = (itemTransfer) => ({
  type: CREATE_ITEMS_TRANSFER,
  itemTransfer,
});

export const updateItemTransfers = (data) => ({
  type: UPDATE_ITEMS_TRANSFER,
  data
});

export const filterItemTransfers = (id) => ({
  type: FILTER_ITEMS_TRANSFER,
  id
});

export const setTransferErrors = (error) => ({
  type: ERROR_TRANSFERS,
  error
});

export const getItemTransfers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}item-transfers`
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

export const getItemTransfer = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}item-transfers/${id}`
      );
      const result = response.data.data;
      console.log(result)
      if (response.status === 200) {
        dispatch(showItemTransfer(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setTransferErrors(error));
      } else {
        dispatch(setTransferErrors(error));
      }
    }
  };
};

export const saveItemTransfers = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}item-transfers/batchInsert`,
        data
      );
      // console.log(response);
    } catch (error) {
      if (error) {
        dispatch(setTransferErrors(error.response.data.data));
      } else {
        dispatch(setTransferErrors(error.response.data));
      }
    }
  };
};

export const editItemTransfers = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data
      );
      console.log(response)
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result);
      if (response.status === 204) {
        dispatch(updateItemTransfers(result));
      }
    } catch (error) {
      console.log(error);
      if (error) {
        dispatch(setTransferErrors(error.response.data.data));
      } else {
        dispatch(setTransferErrors(error.response.data));
      }
    }
  };
};

export const deleteItemTransfers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}item-transfers/${id}`
      );
      console.log(response)
      if (response.status === 204) {
        dispatch(filterItemTransfers(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setTransferErrors(error.response.data.data));
      } else {
        dispatch(setTransferErrors(error.response.data));
      }
    }
  };
};
