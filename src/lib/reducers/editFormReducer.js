import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';
import { validateName, validateUsername } from '../users/userValidations';

export const getEditFormInitialState = ({ name, username, active, role }) => ({
	name: {
		value: name,
		error: undefined
	},
	username: {
		value: username,
		loading: false,
		error: undefined
	},
	active,
	role
});

export const editFormReducer = (state, { type, payload }) => {
	switch (type) {
		case EDIT_FORM_ACTIONS.NAME_CHANGED: {
			const error = validateName(payload);
			return { ...state, name: { value: payload, error } };
		}
		case EDIT_FORM_ACTIONS.USERNAME_CHANGED: {
			const error = validateUsername(payload.value);
			return {
				...state,
				username: {
					value: payload.value,
					loading: !error && !payload.isInitial,
					error
				}
			};
		}
		case EDIT_FORM_ACTIONS.ACTIVE_CHANGED:
			return { ...state, active: payload };
		case EDIT_FORM_ACTIONS.ROLE_CHANGED:
			return { ...state, role: payload };
		case EDIT_FORM_ACTIONS.USERNAME_ERROR_CHANGED:
			return {
				...state,
				username: {
					value: state.username.value,
					loading: false,
					error: payload
				}
			};
		case EDIT_FORM_ACTIONS.REPLACE:
			return payload;
		default:
			throw new Error('Invalid action type');
	}
};
