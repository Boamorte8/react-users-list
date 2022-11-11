import { useState } from 'react';

import { useFilters } from '#Lib/hooks/useFilters.js';
import {
	filterUsersByActive,
	filterUsersByName,
	sortUsers
} from '#Lib/users/filterUsers.js';
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

const useUsers = initialUsers => {
	const [users, setUsers] = useState(initialUsers);

	return { users };
};

export default UsersList;
