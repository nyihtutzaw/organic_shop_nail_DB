import {
    SHOW_BADITEMS,
  CREATE_BADITEMS,
  UPDATE_BADITEMS,
  FILTER_BADITEMS,
  ERROR_BADITEMS
    } from "../type";
    
    const initialState = {
      bad_items: [],
      error: {}
    };
    
    const item = (state = initialState, action) => {
      switch (action.type) {
        case CREATE_BADITEMS:
          return {
              bad_items: [...state.bad_items, action.baditem]
          };
        case SHOW_BADITEMS:
          return {
            ...state,
            bad_items: action.baditems
          };
        case FILTER_BADITEMS:
          const filterBadItems = state.bad_items.filter((item) => item.id !== action.id);
          return {
            ...state,
            bad_items: filterBadItems
          };
        case UPDATE_BADITEMS:
          const index = state.items.findIndex((item) => item.id === action.data.id);
          state.items[index] = action.data;
          return {
            ...state
          };
        case ERROR_BADITEMS:
          return {
            ...state,
            error: action.error
          };
        default:
          return state;
      }
    };
  
    
    export default item;
    