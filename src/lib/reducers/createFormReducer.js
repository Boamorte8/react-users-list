import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';
import { validateName, validateUsername } from '../users/userValidations';

export const CREATE_FORM_INITIAL_STATE = {
	name: {
		value: '',
		error: undefined
	},
	username: {
		value: '',
		loading: false,
		error: undefined
	}
};

export const createFormReducer = (state, action) => {
	switch (action.type) {
		case CREATE_FORM_ACTIONS.NAME_CHANGED: {
			const error = validateName(action.value);
			return { ...state, name: { value: action.value, error } };
		}
		case CREATE_FORM_ACTIONS.USERNAME_CHANGED: {
			const error = validateUsername(action.value);
			return {
				...state,
				username: {
					value: action.value,
					loading: !error,
					error
				}
			};
		}
		case CREATE_FORM_ACTIONS.USERNAME_ERROR_CHANGED:
			return {
				...state,
				username: {
					value: state.username.value,
					loading: false,
					error: action.value
				}
			};
		default:
			throw new Error('Invalid action type');
	}
};
