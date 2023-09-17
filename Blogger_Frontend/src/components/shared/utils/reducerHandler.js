export const formReducer = (state, action) => {
  const initialState = {
    firstname: "",
    lastname: "",
    gender: "",
    location: "",
    phoneNum: "",
    email: "",
    password: "",
    username: "",
    message: "",
    desc: "",
    media: "",
    title: "",
    topic: "",
  };

  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    case "RESET_FORM":
      return initialState;
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};
