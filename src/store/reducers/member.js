import {
  SHOW_MEMBERS,
  SHOW_MEMBER,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  IS_SUCCESS_MEMBER,
  ERROR_MEMBER,
  CLEAR_ALERT_MEMBER
} from "../type";

const initialState = {
  members: [],
  member: {},
  error: [],
  isSuccess: false
};

const member = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEMBERS:
      return {
        ...state,
        shops: [action.member, ...state.members],
        error: [],
        isSuccess: true
      };
    case SHOW_MEMBERS:
      return {
        ...state,
        members: action.members,
        error: [],
        isSuccess: false
      };
    case SHOW_MEMBER:
      return {
        ...state,
        member: action.member,
        error: [],
        isSuccess: false
      };
    case FILTER_MEMBERS:
      const filterShop = state.members.filter(
        (member) => member.id !== action.id
      );
      return {
        ...state,
        members: filterShop,
        error: [],
        isSuccess: true
      };
    case UPDATE_MEMBERS:
      const index = state.members.findIndex(
        (member) => member.id === action.data.id
      );
      state.members[index] = action.data;
      return {
        ...state,
        error: []
      };
    case ERROR_MEMBER:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    case IS_SUCCESS_MEMBER:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case CLEAR_ALERT_MEMBER:
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
