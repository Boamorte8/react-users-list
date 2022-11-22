import { useEffect, useReducer } from 'react';

import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';
import { findUserByUsername } from '../api/usersApi';
import {
	editFormReducer,
	getEditFormInitialState
} from '../reducers/editFormReducer';

export const useEditForm = user => {
	const [formValues, dispatchEditForm] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	);

	const isFormInvalid =
		areInitialValues(formValues, user) ||
		!!formValues.name.error ||
		!!formValues.username.error ||
		formValues.username.loading;

	useEffect(() => {
		dispatchEditForm({
			type: EDIT_FORM_ACTIONS.REPLACE,
			value: getEditFormInitialState(user)
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
