import { useState } from 'react';
import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import { getDisplayUsers } from '../../lib/users/filterUsers.js';
import UserFormContainer from '../molecules/user-forms/UserFormContainer.jsx';
import UsersListFilters from '../molecules/user-list/UsersListFilters';
import UsersListPagination from '../molecules/user-list/UsersListPagination.jsx';
import UsersListRows from '../molecules/user-list/UsersListRows';
import UsersListViewSelector from '../molecules/user-list/UsersListViewSelector.jsx';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import style from './UsersList.module.css';

const UsersList = () => {
	const [view, setView] = useState(true);
	const {
		filters,
		pagination,
		filtersSetters,
		paginationSetters,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	const { paginatedUsers, pages } = getDisplayUsers(users, filters, pagination);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			<UserFormsProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters {...filters} {...filtersSetters} />
				<UsersListViewSelector view={view} setView={setView} />
				<UserFormContainer />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormsProvider>

			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				pages={pages}
			/>
		</div>
	);
};

export default UsersList;
