import { useEffect, useState } from 'react';

import { findAllUsers } from '../api/usersApi';

export const useUsers = filters => {
	const [{ data, count, error, loading }, setUsers] = useState({
		data: [],
		count: 0,
		error: false,
		loading: true
	});

	const setData = (newData, newCount) =>
		setUsers({ data: newData, count: newCount, error: false, loading: false });
	const setError = () =>
		setUsers({ data: [], count: 0, error: true, loading: false });

	useEffect(() => {
		const controller = new AbortController();

		loadUsers(setData, setError, controller.signal, filters);
		return () => controller.abort();
	}, [filters]);

	return {
		users: data,
		totalUsers: count,
		usersError: error,
		usersLoading: loading
	};
};

const loadUsers = async (setUsers, setError, signal, pagination) => {
	const { users, count, aborted } = await findAllUsers(signal, pagination);
	if (aborted) return;
	if (users) setUsers(users, count);
	else setError();
};
