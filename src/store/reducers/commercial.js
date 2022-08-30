import { DELETE_COMMERCIAL, SHOW_COMMERCIAL, SHOW_COMMERCIALS } from '../type'

const initialState = {
  commercials: [],
  commercial: {},
}

const commercial = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMMERCIALS:
      return {
        ...state,
        commercials: action.payload,
      }
    case SHOW_COMMERCIAL:
      return {
        ...state,
        commercial: action.payload,
      }
    case DELETE_COMMERCIAL:
      return {
        ...state,
        commercials: state.commercials.filter(
          (commercial) => commercial.id !== action.payload,
        ),
      }
    default:
      return state
  }
}

export default commercial
