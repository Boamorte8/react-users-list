import { useEffect, useState } from 'react';

export const useDeleteForm = user => {
	const [formValues, setFormValues] = useState(() => getInitialState(user));

	useEffect(() => {
		setFormValues(getInitialState(user));
	}, [user]);

	return { ...formValues };
};

const getInitialState = user => ({ ...user });
