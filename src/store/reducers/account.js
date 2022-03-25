import {
    SHOW_ACCOUNTS,
    CREATE_ACCOUNTS,
    UPDATE_ACCOUNTS,
    FILTER_ACCOUNTS,
    ERROR_ACCOUNT
  } from "../type";
  
  const initialState = {
    accounts: [],
    error: {}
    // member: {},
  };
  
  const member = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ACCOUNTS:
        return {
          ...state,
          accounts: [action.account, ...state.accounts]
        };
      case SHOW_ACCOUNTS:
        return {
          ...state,
          members: action.members
        };
      case FILTER_ACCOUNTS:
        const filterShop = state.members.filter(
          (member) => member.id !== action.id
        );
        return {
          ...state,
          members: filterShop
        };
      case UPDATE_ACCOUNTS:
        // const updateShop = state.members.map(member => member.id === action.data.id ? action.data : member);
        const index = state.members.findIndex(
          (member) => member.id === action.data.id
        );
        state.members[index] = action.data;
        return {
          ...state
        };
      case ERROR_ACCOUNT:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  
  export default member;
  