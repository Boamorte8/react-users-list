import { useEffect, useState } from 'react';

import { validateName, validateUsername } from '../users/userValidations';

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	let error;
	try {
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{ signal }
		);
		if (res.ok) {
			const data = await res.json();
			if (data.length) error = 'Username already in use';
		} else {
			error = 'Error validating';
		}
	} catch (err) {
		if (err.name === 'AbortError') return;
		error = 'Error validating';
	}
	setUsernameError(error);
};

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

	useEffect(() => {
		if (formValues.username.loading) {
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
		}
	}, [formValues.username.value, formValues.username.loading]);

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

	return {
		...formValues,
		setName,
		setUsername,
		setUsernameError
	};
};
