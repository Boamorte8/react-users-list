import { SORT_OPTIONS } from '../../constants/sortOptions';

export const createUser = async user => {
	try {
		const res = await fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		});
		return !!res.ok;
	} catch (error) {
		return false;
	}
};

export const updateUser = async user => {
	try {
		const res = await fetch(`http://localhost:4000/users/${user.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		});
		return !!res.ok;
	} catch (error) {
		return false;
	}
};

export const deleteUser = async userId => {
	try {
		const res = await fetch(`http://localhost:4000/users/${userId}`, {
			method: 'DELETE'
		});
		return !!res.ok;
	} catch (error) {
		return false;
	}
};

const SORT_MAPPER = {
	[SORT_OPTIONS.NAME]: ['name', 'asc'],
	[SORT_OPTIONS.ROLE]: ['role', 'desc'],
	[SORT_OPTIONS.ACTIVE]: ['active', 'desc']
};

const getFindAllUrl = ({ page, itemsPerPage, search, onlyActive, sortBy }) => {
	const url = new URL('http://localhost:4000/users');
	url.searchParams.append('_page', page);
	url.searchParams.append('_limit', itemsPerPage);

	if (search) url.searchParams.append('name_like', search);
	if (onlyActive) url.searchParams.append('active', true);

	const sortProps = SORT_MAPPER[sortBy];
	if (sortProps) {
		url.searchParams.append('_sort', sortProps[0]);
		url.searchParams.append('_order', sortProps[1]);
	}
	return url;
};

export const findAllUsers = async (signal, filters) => {
	const url = getFindAllUrl(filters);

	try {
		const res = await fetch(url, { signal });
		let users;
		let count = 0;
		if (res.ok) {
			users = await res.json();
			count = res.headers.get('x-total-count');
		}
		return {
			users,
			error: !res.ok,
			aborted: false,
			count
		};
	} catch (error) {
		const isAborted = error.name === 'AbortError';
		return {
			users: undefined,
			error: !isAborted,
			aborted: isAborted,
			count: 0
		};
	}
};

export const findUserByUsername = async (username, signal) => {
	try {
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{ signal }
		);
		let user;
		if (res.ok) {
			const users = await res.json();
			user = users[0];
		}
		return {
			user,
			error: !res.ok,
			aborted: false
		};
	} catch (error) {
		const isAborted = error.name === 'AbortError';
		return {
			user: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};
