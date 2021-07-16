const id1 = localStorage.getItem("user_id") || "";
const initialState = {

    id : id1 ,
};

const id = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_ID":
            return { id: payload  };
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
