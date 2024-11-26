import {  REGISTER, SETUSERPROFILE } from "../constants/AuthCons";

  
  export default (state = {}, action) => {
    switch (action.type) {
      case SETUSERPROFILE:
        return action.payload
      case REGISTER:
        return {
          ...state,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        };
      default:
        return state;
    }
  
    return state;
  };