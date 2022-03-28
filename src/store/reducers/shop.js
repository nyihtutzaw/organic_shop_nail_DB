import { SHOW_SHOPS,SHOW_SHOP, CREATE_SHOPS, UPDATE_SHOPS, FILTER_SHOPS, ERROR_SHOP } from "../type";

const initialState = {
  shops: [],
  shop: {},
  error: {}
};

const shop = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHOPS:
      return {
        ...state,
        shops: [action.shop, ...state.shops]
      };
    case SHOW_SHOPS:
      return {
        ...state,
        shops: action.shops
      };
    case SHOW_SHOP:
      return {
        ...state,
        shop: action.shop
      };
      case FILTER_SHOPS:
        const filterShop = state.shops.filter(shop => shop.id !== action.id);
        return {
          ...state,
          shops: filterShop
        };
      case UPDATE_SHOPS:
        const updateShop = state.shops.map(shop => shop.id === action.data.id ? action.data : shop);
        return {
          ...state,
          shops: updateShop
        };
        case ERROR_SHOP:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default shop;
