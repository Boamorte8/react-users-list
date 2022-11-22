import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';

export const nameChangedCreateForm = payload => ({
	type: CREATE_FORM_ACTIONS.NAME_CHANGED,
	payload
});

export const usernameChangedCreateForm = payload => ({
	type: CREATE_FORM_ACTIONS.USERNAME_CHANGED,
	payload
});

export const usernameErrorChangedCreateForm = payload => ({
	type: CREATE_FORM_ACTIONS.USERNAME_ERROR_CHANGED,
	payload
});
