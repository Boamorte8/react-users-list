import { useEffect, useState } from 'react';

import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

export const useEditForm = ({ name, username, active, role }) => {
	const [formValues, setFormValues] = useState(() =>
		getInitialState({ name, username, active, role })
	);

	const isFormInvalid =
		areInitialValues(formValues, { name, username, active, role }) ||
		!!formValues.name.error ||
		!!formValues.username.error ||
		formValues.username.loading;

	const setName = name => {
		const error = validateName(name);
		setFormValues({ ...formValues, name: { value: name, error } });
	};
	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		const isInitial = newUsername === username;
		setFormValues({
			...formValues,
			username: { value: newUsername, loading: !error && !isInitial, error }
		});
	};

	const setActive = active => setFormValues({ ...formValues, active });
	const setRole = role => setFormValues({ ...formValues, role });

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
		setFormValues(getInitialState({ name, username, active, role }));
		// return () => {
		// 	cleanup
		// };
	}, [name, username, active, role]);

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
		isFormInvalid,
		setName,
		setUsername,
		setActive,
		setRole
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
