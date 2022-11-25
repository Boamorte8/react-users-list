import { useReducer, useState } from 'react';

import { resetFilters } from '../../lib/actions/filtersActions.js';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE
} from '../../lib/reducers/filtersReducer.js';
import UsersListFilters from '../molecules/user-list/UsersListFilters';
import UsersListPagination from '../molecules/user-list/UsersListPagination.jsx';
import UsersListRows from '../molecules/user-list/UsersListRows';
import UsersListViewSelector from '../molecules/user-list/UsersListViewSelector.jsx';
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

			<UserFormsContext.Provider
				value={{ onSuccess: () => dispatchFilters(resetFilters()) }}
			>
				<UsersListFilters
					search={search}
					onlyActive={onlyActive}
					sortBy={sortBy}
					dispatchFilters={dispatchFilters}
				/>
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
			</UserFormsContext.Provider>

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
