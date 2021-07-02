
const initialState = {
    photo:"",
};

const photo = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_PHOTO":
            return { photo:payload };
        default:
            return state;
    }
};

export default photo;

export const setPhoto = (photo) => {
    return {
        type: "SET_PHOTO",
        payload: photo,
    };
};
