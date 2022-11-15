import { useEffect, useState } from 'react';

import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const useCreateForm = () => {
	const [formValues, setFormValues] = useState({
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

	const isFormValid =
		!name.value ||
		!!name.error ||
		!username.value ||
		!!username.error ||
		username.loading;

	const setName = name => {
		const error = validateName(name);
		setFormValues({ ...formValues, name: { value: name, error } });
	};
	const setUsername = username => {
		const error = validateUsername(username);
		setFormValues({
			...formValues,
			username: { value: username, loading: !error, error }
		});
	};

	const setUsernameError = error =>
		setFormValues(prevFormValues => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				loading: false,
				error
			}
		}));

	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				setUsernameError,
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
		isFormValid,
		setName,
		setUsername,
		setUsernameError
	};
};

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	let errorMessage;
	const { user, error, aborted } = findUserByUsername(username, signal);
	if (aborted) return;
	if (error) errorMessage = 'Error validating';
	if (user) errorMessage = 'Username already in use';
	setUsernameError(errorMessage);
};
