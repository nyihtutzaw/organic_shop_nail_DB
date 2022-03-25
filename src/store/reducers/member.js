import {
  SHOW_MEMBERS,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  ERROR_ITEM
} from "../type";

const initialState = {
  members: [],
  error: {}
  // member: {},
};

const member = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEMBERS:
      return {
        ...state,
        shops: [action.member, ...state.members]
      };
    case SHOW_MEMBERS:
      return {
        ...state,
        members: action.members
      };
    case FILTER_MEMBERS:
      const filterShop = state.members.filter(
        (member) => member.id !== action.id
      );
      
      return {
        ...state,
        members: filterShop
      };
    case UPDATE_MEMBERS:
      // const updateShop = state.members.map(member => member.id === action.data.id ? action.data : member);
      const index = state.members.findIndex(
        (member) => member.id === action.data.id
      );
      state.members[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default member;
