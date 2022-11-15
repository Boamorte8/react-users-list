import { useEffect, useState } from 'react';

import { findAllUsers } from '../api/usersApi';

export const useUsers = () => {
	const [{ data, error, loading }, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});

	const setData = newData =>
		setUsers({ data: newData, error: false, loading: false });
	const setError = () => setUsers({ data: [], error: true, loading: false });
	const reloadUsers = () => setUsers({ data: [], error: false, loading: true });

	useEffect(() => {
		if (!loading) return;
		const controller = new AbortController();

		loadUsers(setData, setError, controller.signal);
		return () => controller.abort();
	}, [loading]);

	return { users: data, usersError: error, usersLoading: loading, reloadUsers };
};

const loadUsers = async (setUsers, setError, signal) => {
	const { users, aborted } = await findAllUsers(signal);
	if (aborted) return;
	if (users) setUsers(users);
	else setError();
};
