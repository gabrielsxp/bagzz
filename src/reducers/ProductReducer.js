export const initialState = {
  discounts: {}
}

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'setDiscounts':
      return { ...state, discounts: { ...state.discounts, ...action.payload } };
    default:
      break;
  }
}