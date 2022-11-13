import { useEffect, useState } from 'react';
import {
	filterUsersByActive,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from '../users/filterUsers';

const fetchUsers = async (setUsers, setError, signal) => {
	try {
		const res = await fetch('http://localhost:4000/users', { signal });
		if (res.ok) {
			const data = await res.json();
			setUsers(data);
		} else {
			setError();
		}
	} catch (error) {
		setError();
	}
};

const getDisplayUsers = (
	users,
	{ onlyActive, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filterUsersByActive(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const { paginatedUsers, pages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, pages };
};

export const useUsers = filters => {
	const [{ data, error, loading }, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});

	const setData = newData =>
		setUsers({ data: newData, error: false, loading: false });
	const setError = () => setUsers({ data: [], error: true, loading: false });

	useEffect(() => {
		const controller = new AbortController();

		fetchUsers(setData, setError, controller.signal);
		return () => controller.abort();
	}, []);

	const { paginatedUsers, pages } = getDisplayUsers(data, filters);

	return { users: paginatedUsers, pages, error, loading };
};
