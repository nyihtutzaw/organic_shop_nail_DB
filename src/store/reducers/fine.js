import { DELETE_FINE, SHOW_FINE, SHOW_FINES } from '../type'

const initialState = {
  fines: [],
  fine: {},
}

const fine = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FINES:
      return {
        ...state,
        fines: action.payload,
      }
    case SHOW_FINE:
      return {
        ...state,
        fine: action.payload,
      }
    case DELETE_FINE:
      return {
        ...state,
        fines: state.fines.filter(
          (fine) => fine.id !== action.payload,
        ),
      }
    default:
      return state
  }
}

export default fine
