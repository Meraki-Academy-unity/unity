const initialState = {
  users: [],
};

const signUp = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { users: [...payload] };
    case "ADD_USER":
      return { users: [...state.users, payload] };
    case "UPDATE_USER":
      return {
        users: state.users.map((elem) => {
          if (elem._id === payload) {
            return payload;
          }
          return elem;
        }),
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((elem) => {
          return elem._id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default signUp;

export const setUsers = (users) => {
  return {
    type: "SET_USER",
    payload: users,
  };
};

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const updateUser = (id) => {
  return {
    type: "UPDATE_USER",
    payload: id,
  };
};

export const deleteUser = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  };
};
