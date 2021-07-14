const token = localStorage.getItem("token") || "";
const initialState = {
  token,
};

const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload };
    default:
      return state;
  }
};

export default login;

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};
