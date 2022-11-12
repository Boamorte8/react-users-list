import { useFilters } from '../../lib/hooks/useFilters.js';
import {
	filterUsersByActive,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from '../../lib/users/filterUsers.js';
import UsersListFilters from '../molecules/UsersListFilters';
import UsersListPagination from '../molecules/UsersListPagination.jsx';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = ({ initialUsers }) => {
	const {
		search,
		onlyActive,
		sortBy,
		page,
		itemsPerPage,
		setPage,
		setItemsPerPage,
		...setFiltersFunctions
	} = useFilters();

	const { users, pages } = getUsers(initialUsers, {
		onlyActive,
		search,
		sortBy,
		page,
		itemsPerPage
	});
	const pagination = {
		page,
		itemsPerPage,
		pages,
		setPage,
		setItemsPerPage
	};

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
			<UsersListRows users={users} />
			<UsersListPagination {...pagination} />
		</div>
	);
};

const getUsers = (
	initialUsers,
	{ onlyActive, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filterUsersByActive(initialUsers, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const pages = Math.ceil(usersFiltered.length / itemsPerPage);
	usersFiltered = paginateUsers(usersFiltered, page, itemsPerPage);

	return { users: usersFiltered, pages };
};

export default UsersList;
