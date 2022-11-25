import { useState } from 'react';

export const useDeleteForm = user => {
	const [formValues, setFormValues] = useState(() => getInitialState(user));

	return { ...formValues };
};

const getInitialState = user => ({ ...user });
