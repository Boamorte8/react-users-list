import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';

export const nameChangedEditForm = payload => ({
	type: EDIT_FORM_ACTIONS.NAME_CHANGED,
	payload
});

export const usernameChangedEditForm = (value, currentUsername) => ({
	type: EDIT_FORM_ACTIONS.USERNAME_CHANGED,
	payload: {
		value,
		isInitial: value === currentUsername
	}
});

export const activeChangedEditForm = payload => ({
	type: EDIT_FORM_ACTIONS.ACTIVE_CHANGED,
	payload
});

export const roleChangedEditForm = payload => ({
	type: EDIT_FORM_ACTIONS.ROLE_CHANGED,
	payload
});

export const usernameErrorChangedEditForm = payload => ({
	type: EDIT_FORM_ACTIONS.USERNAME_ERROR_CHANGED,
	payload
});
