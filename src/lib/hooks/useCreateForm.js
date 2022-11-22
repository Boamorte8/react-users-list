import { useEffect, useReducer } from 'react';

import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const CREATE_FORM_ACTIONS = {
	NAME_CHANGED: 'NAME_CHANGED',
	USERNAME_CHANGED: 'USERNAME_CHANGED',
	USERNAME_ERROR_CHANGED: 'USERNAME_ERROR_CHANGED'
};

const createFormReducer = (state, action) => {
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

export const useCreateForm = () => {
	const [formValues, dispatchCreateForm] = useReducer(createFormReducer, null, {
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	const { name, username } = formValues;

	const isFormInvalid =
		!name.value ||
		!!name.error ||
		!username.value ||
		!!username.error ||
		username.loading;

	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				dispatchCreateForm,
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
		dispatchCreateForm
	};
};

const validateUsernameIsAvailable = async (
	username,
	dispatchCreateForm,
	signal
) => {
	let errorMessage;
	const { user, error, aborted } = findUserByUsername(username, signal);
	if (aborted) return;
	if (error) errorMessage = 'Error validating';
	if (user) errorMessage = 'Username already in use';
	dispatchCreateForm({
		type: CREATE_FORM_ACTIONS.USERNAME_ERROR_CHANGED,
		value: errorMessage
	});
};
