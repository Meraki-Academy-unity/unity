
const initialState = {
    id: 0,
};

const id = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_ID":
            return { id: payload };
        default:
            return state;
    }
};

export default id;

export const setUserId = (id) => {
    return {
        type: "SET_ID",
        payload: id,
    };
};
