import { mockItems } from "../../mock";
import { SHOW_ITEMS_TRANSFER, CREATE_ITEMS_TRANSFER } from "../type";

export const showItemTransfers = (itemTransfers) => ({
  type: SHOW_ITEMS_TRANSFER,
  itemTransfers: itemTransfers,
});

export const createItemTransfers = (itemTransfer) => ({
  type: CREATE_ITEMS_TRANSFER,
  itemTransfer,
});


export const getItemTransfers = () => {
  return async (dispatch) => {
    try {
      // result => api
      dispatch(showItemTransfers(mockItems));
    } catch (error) {}
  };
};

export const saveItemTransfers = (data) => {
  return async (dispatch) => {
    try {
      data.forEach((element) => {
        element.key = mockItems.length + 1;
        mockItems.push(element);
      });
      //   dispatch(createItems(data));
    } catch (error) {}
  };
};

