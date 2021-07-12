
const initialState = {
    emoji:"",
};

const emoji = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_EMOJI":
            return { emoji: payload };
        default:
            return state;
    }
};

export default emoji;

export const setEmoji = (emoji) => {
    return {
        type: "SET_EMOJI",
        payload: emoji,
    };
};
