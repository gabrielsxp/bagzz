export const initialState = {
  user: {},
  token: null
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'setToken':
      return { ...state, token: { ...state.token, ...action.payload } };
    default:
      break;
  }
}