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

export const editFormReducer = (state, action) => {
	switch (action.type) {
		case EDIT_FORM_ACTIONS.NAME_CHANGED: {
			const error = validateName(action.value);
			return { ...state, name: { value: action.value, error } };
		}
		case EDIT_FORM_ACTIONS.USERNAME_CHANGED: {
			const error = validateUsername(action.value);
			const isInitial = action.value === action.currentUsername;
			return {
				...state,
				username: {
					value: action.value,
					loading: !error && !isInitial,
					error
				}
			};
		}
		case EDIT_FORM_ACTIONS.ACTIVE_CHANGED:
			return { ...state, active: action.value };
		case EDIT_FORM_ACTIONS.ROLE_CHANGED:
			return { ...state, role: action.value };
		case EDIT_FORM_ACTIONS.USERNAME_ERROR_CHANGED:
			return {
				...state,
				username: {
					value: state.username.value,
					loading: false,
					error: action.value
				}
			};
		case EDIT_FORM_ACTIONS.REPLACE:
			return action.value;
		default:
			throw new Error('Invalid action type');
	}
};
