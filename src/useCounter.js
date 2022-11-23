import { useState } from 'react';

export const useCounter = () => {
	const [counter, setCounter] = useState(0);

	return { counter, setCounter };
};
