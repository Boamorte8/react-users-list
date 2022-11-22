import { useReducer, useState } from 'react';

import { FILTERS_ACTIONS } from '../../constants/filtersActions.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE
} from '../../lib/reducers/filtersReducer.js';
import UserFormContainer from '../molecules/user-forms/UserFormContainer.jsx';
import UsersListFilters from '../molecules/user-list/UsersListFilters';
import UsersListPagination from '../molecules/user-list/UsersListPagination.jsx';
import UsersListRows from '../molecules/user-list/UsersListRows';
import UsersListViewSelector from '../molecules/user-list/UsersListViewSelector.jsx';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import style from './UsersList.module.css';

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);
	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	const { search, onlyActive, sortBy, page, itemsPerPage } = filters;

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			<UserFormsProvider
				resetFilters={() =>
					dispatchFilters({ type: FILTERS_ACTIONS.RESET_FILTERS })
				}
			>
				<UsersListFilters
					search={search}
					onlyActive={onlyActive}
					sortBy={sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UserFormContainer />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					showRowsFormat={showRowsFormat}
				/>
			</UserFormsProvider>

			<UsersListPagination
				page={page}
				itemsPerPage={itemsPerPage}
				totalUsers={totalUsers}
				dispatchFilters={dispatchFilters}
			/>
		</div>
	);
};

export default UsersList;
