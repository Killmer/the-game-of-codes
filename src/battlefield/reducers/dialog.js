import actionTypes from "../constants/action-types";

function dialog(state = { isOpen: false, dialogProps: null }, action) {
  switch (action.type) {
    case actionTypes.SHOW_DIALOG:
      return {
        isOpen: true,
        dialogProps: action.payload.dialogProps
      };
    case actionTypes.HIDE_DIALOG:
      return {
        isOpen: false,
        dialogProps: null
      };

    default:
      return state;
  }
}

export default dialog;
