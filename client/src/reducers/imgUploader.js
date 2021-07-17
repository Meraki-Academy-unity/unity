const initialState = {
  url: "",
};

const imgUploader = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_URL":
      return { url: payload };
    default:
      return state;
  }
};

export default imgUploader;

export const setUrl = (url) => {
  return {
    type: "SET_URL",
    payload: url,
  };
};
