import {
  SHOW_SERVICES,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_ITEM
} from "../type";

const initialState = {
  services: [],
  error: {}
};

const service = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SERVICES:
      return {
        // ...state,
        // services: [action.service, ...state.services]
        services: [...state.services, action.service]
      };
    case SHOW_SERVICES:
      return {
        ...state,
        services: action.services
      };
    case FILTER_SERVICES:
      const filterServices = state.services.filter(
        (service) => service.id !== action.id
      );
      return {
        ...state,
        services: filterServices
       
      };
    case UPDATE_SERVICES:
      const index = state.services.findIndex(
        (service) => service.id === action.data.id
      );
      state.services[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default service;
