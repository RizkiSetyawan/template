import { ALERT_SUCCESS, ALERT_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        openAlert: true
      };

    case ALERT_ERROR:
      return {
        ...state,
        openAlert: false
      };

    default:
      return state;
  }
};
