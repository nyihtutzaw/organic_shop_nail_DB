import {
  SHOW_SERVICES,
  SHOW_SERVICE,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_SERVICES,
  IS_SUCCESS_SERVICES,
  CLEAR_ALERT_SERVICES
} from "../type";

const initialState = {
  services: [],
  service: {},
  error: [],
  isSuccess: false
};

const service = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SERVICES:
      return {
        services: [...state.services, action.service],
        error: [],
        isSuccess: true
      };
    case SHOW_SERVICES:
      return {
        ...state,
        services: action.services,
        error: [],
        isSuccess: false
      };
      
    case SHOW_SERVICE:
      return {
        ...state,
        service: action.service,
        error: [],
        isSuccess: false
      };
    case FILTER_SERVICES:
      const filterServices = state.services.filter(
        (service) => service.id !== action.id
      );
      return {
        ...state,
        services: filterServices,
        error: [],
        isSuccess: true
      };
    case UPDATE_SERVICES:
      const index = state.services.findIndex(
        (service) => service.id === action.data.id
      );
      state.services[index] = action.data;
      return {
        ...state,
        error: []
      };
    case ERROR_SERVICES:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
      case IS_SUCCESS_SERVICES:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case CLEAR_ALERT_SERVICES:
      return {
        ...state,
        error: [],
        isSuccess: false
      };
    default:
      return state;
  }
};

export default service;
