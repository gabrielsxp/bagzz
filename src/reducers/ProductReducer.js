export const initialState = {
  discounts: {},
  cart: { products: [], totalPrice: 0, user: null }
}

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'setDiscounts':
      return { ...state, discounts: { ...state.discounts, ...action.payload } };
    case 'setCart':
      return { ...state, cart: Object.assign({}, action.payload) };
    default:
      break;
  }
}