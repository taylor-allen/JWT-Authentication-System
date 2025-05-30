export const initialStore = () => {
  return {
    token: null,
  };
};

export default function storeReducer(store, action = {}) {
  if (action.type == "updateToken") {
    return {
      ...store,
      token: action.payload,
    };
  }
}
