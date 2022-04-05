import {
  SHOW_ACCOUNTS,
  CREATE_ACCOUNTS,
  UPDATE_ACCOUNTS,
  FILTER_ACCOUNTS,
  ERROR_ACCOUNT,
  IS_SUCCESS_ACCOUNT,
  CLEAR_ALERT_ACCOUNT,
  CHANGE_PASSWORD,
} from "../type";

const initialState = {
  accounts: [],
  error: [],
  isSuccess: false
};

const member = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNTS:
      return {
        ...state,
        error: [],
        isSuccess: true,
        accounts: [action.account, ...state.accounts]
      };
    case SHOW_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      };
    case FILTER_ACCOUNTS:
      const filterAccount = state.accounts.filter(
        (member) => member.id !== action.id
      );
      return {
        ...state,
        error: [],
        isSuccess: true,
        accounts: filterAccount
      };
    case UPDATE_ACCOUNTS:
      // const updateShop = state.members.map(member => member.id === action.data.id ? action.data : member);
      const index = state.accounts.findIndex(
        (member) => member.id === action.data.id
      );
      state.accounts[index] = action.data;
      return {
        ...state
      };
    case ERROR_ACCOUNT:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    case IS_SUCCESS_ACCOUNT:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        isSuccess: true,
        error: [],
      }
    case CLEAR_ALERT_ACCOUNT:
      return {
        ...state,
        error: [],
        isSuccess: false
      };
    default:
      return state;
  }
};

export default member;
