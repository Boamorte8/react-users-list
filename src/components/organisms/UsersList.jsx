import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import { getDisplayUsers } from '../../lib/users/filterUsers.js';
import UserFormContainer from '../molecules/user-forms/UserFormContainer.jsx';
import UsersListFilters from '../molecules/UsersListFilters';
import UsersListPagination from '../molecules/UsersListPagination.jsx';
import UsersListRows from '../molecules/UsersListRows';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import style from './UsersList.module.css';

const UsersList = () => {
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
				<UserFormContainer />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
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
