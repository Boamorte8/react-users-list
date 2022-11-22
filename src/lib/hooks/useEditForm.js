import { useEffect, useReducer } from 'react';

import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const EDIT_FORM_ACTIONS = {
	NAME_CHANGED: 'NAME_CHANGED',
	USERNAME_CHANGED: 'USERNAME_CHANGED',
	ACTIVE_CHANGED: 'ACTIVE_CHANGED',
	ROLE_CHANGED: 'ROLE_CHANGED',
	USERNAME_ERROR_CHANGED: 'USERNAME_ERROR_CHANGED',
	REPLACE: 'REPLACE'
};

const editFormReducer = (state, action) => {
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

export const useEditForm = user => {
	const [formValues, dispatchEditForm] = useReducer(
		editFormReducer,
		user,
		getInitialState
	);

	const isFormInvalid =
		areInitialValues(formValues, user) ||
		!!formValues.name.error ||
		!!formValues.username.error ||
		formValues.username.loading;

	useEffect(() => {
		dispatchEditForm({
			type: EDIT_FORM_ACTIONS.REPLACE,
			value: getInitialState(user)
		});
	}, [user]);

	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				dispatchEditForm,
				controller.signal
			);
		}, 500);
		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [formValues.username.value, formValues.username.loading]);

	return {
		...formValues,
		isFormInvalid,
		dispatchEditForm
	};
};

const getInitialState = ({ name, username, active, role }) => ({
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

const areInitialValues = (formValues, user) =>
	formValues.name.value === user.name &&
	formValues.username.value === user.username &&
	formValues.role === user.role &&
	formValues.active === user.active;

const validateUsernameIsAvailable = async (
	username,
	dispatchEditForm,
	signal
) => {
	let errorMessage;
	const { user, error, aborted } = findUserByUsername(username, signal);
	if (aborted) return;
	if (error) errorMessage = 'Error validating';
	if (user) errorMessage = 'Username already in use';
	dispatchEditForm({
		type: EDIT_FORM_ACTIONS.USERNAME_ERROR_CHANGED,
		value: errorMessage
	});
};
