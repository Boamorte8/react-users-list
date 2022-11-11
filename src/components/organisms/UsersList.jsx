import { useState } from 'react';

import UsersListFilters from '../molecules/UsersListFilters';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = useFilters();
	const { users } = useUsers(initialUsers);

	let usersFiltered = filterUsersByActive(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
			<UsersListRows users={usersFiltered} />
		</div>
	);
};

const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: 0
	});
	const setSearch = search => setFilters({ ...filters, search });
	const setOnlyActive = onlyActive => {
		if (onlyActive && filters.sortBy === 3)
			setFilters({ ...filters, onlyActive, sortBy: 0 });
		else setFilters({ ...filters, onlyActive });
	};
	const setSortBy = sortBy => setFilters({ ...filters, sortBy });

	return { ...filters, setSearch, setOnlyActive, setSortBy };
};

const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	return { users };
};

const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase();

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	);
};

const filterUsersByActive = (users, active) => {
	if (!active) return [...users];

	return users.filter(user => user.active);
};

const sortUsers = (users, sortBy) => {
	const sortUsers = [...users];
	switch (sortBy) {
		case 1:
			return sortUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		case 2:
			return sortUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === 'teacher' || (a.role !== 'other' && b.role === 'other'))
					return -1;
				return 1;
			});
		case 3:
			return sortUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active) return -1;
				return 1;
			});

		default:
			return sortUsers;
	}
};

export default UsersList;
