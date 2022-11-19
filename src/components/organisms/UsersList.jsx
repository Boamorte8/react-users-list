import { useState } from 'react';
import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import UserFormContainer from '../molecules/user-forms/UserFormContainer.jsx';
import UsersListFilters from '../molecules/user-list/UsersListFilters';
import UsersListPagination from '../molecules/user-list/UsersListPagination.jsx';
import UsersListRows from '../molecules/user-list/UsersListRows';
import UsersListViewSelector from '../molecules/user-list/UsersListViewSelector.jsx';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import style from './UsersList.module.css';

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);
	const { filters, filtersSetters, paginationSetters, resetFilters } =
		useFilters();

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	// Pagination on client side
	// const { paginatedUsers, pages } = getDisplayUsers(users, filters, pagination);

	const { search, onlyActive, sortBy, page, itemsPerPage } = filters;

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			<UserFormsProvider resetFilters={resetFilters}>
				<UsersListFilters
					search={search}
					onlyActive={onlyActive}
					sortBy={sortBy}
					{...filtersSetters}
				/>
				<UserFormContainer />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					// users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
					showRowsFormat={showRowsFormat}
				/>
			</UserFormsProvider>

			<UsersListPagination
				page={page}
				itemsPerPage={itemsPerPage}
				totalUsers={totalUsers}
				{...paginationSetters}
			/>
		</div>
	);
};

export default UsersList;
