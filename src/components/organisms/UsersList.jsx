import { useState } from 'react';

import UsersListFilters from '../molecules/UsersListFilters';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = useFilters();
	const { users, toggleUserActive } = useUsers(initialUsers);

	let usersFiltered = filterUsersByActive(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1>User List</h1>

			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>

			<UsersListRows
				users={usersFiltered}
				toggleUserActive={toggleUserActive}
			/>
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
	const setOnlyActive = onlyActive => setFilters({ ...filters, onlyActive });
	const setSortBy = sortBy => setFilters({ ...filters, sortBy });

	return { ...filters, setSearch, setOnlyActive, setSortBy };
};

const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	const toggleUserActive = userId => {
		const newUsers = users.map(user => {
			if (user.id === userId) user.active = !user.active;
			return user;
		});

		setUsers(newUsers);
	};

	return { users, toggleUserActive };
};

const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase();

	return users.filter(user =>
		user.name.toLowerCase().startsWith(lowerCasedSearch)
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

		default:
			return sortUsers;
	}
};

export default UsersList;
