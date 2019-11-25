import actionTypes from '../constants/action-types';

export default function showDialog(dialogProps) {
    return {
        type: actionTypes.SHOW_DIALOG,
        payload: {
            dialogProps
        }
    };
}
