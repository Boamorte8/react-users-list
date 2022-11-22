import { useEffect, useReducer } from 'react';

import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';
import { findUserByUsername } from '../api/usersApi';
import {
	createFormReducer,
	CREATE_FORM_INITIAL_STATE
} from '../reducers/createFormReducer';

export const useCreateForm = () => {
	const [formValues, dispatchCreateForm] = useReducer(
		createFormReducer,
		null,
		CREATE_FORM_INITIAL_STATE
	);

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
