import { useState } from 'react';

import { USER_FORMS } from '../../constants/userForms.js';
import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import {
	filterUsersByActive,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from '../../lib/users/filterUsers.js';
import Button from '../atoms/buttons/Button.jsx';
import UserCreateForm from '../molecules/user-forms/UserCreateForm.jsx';
import UserFormLayout from '../molecules/user-forms/UserFormLayout.jsx';
import UsersListFilters from '../molecules/UsersListFilters';
import UsersListPagination from '../molecules/UsersListPagination.jsx';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = () => {
	const {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	} = useForm();
	const {
		filters,
		pagination,
		filtersSetters,
		paginationSetters,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	const { paginatedUsers, pages } = getDisplayUsers(users, filters, pagination);

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>User List</h1>

			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					{...filters}
					{...filtersSetters}
					slot={<Button onClick={setCreateForm}>Add user</Button>}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					<UserCreateForm onClose={setFiltersForm} onSuccess={onSuccess} />
				</UserFormLayout>
			)}
			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
			/>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				pages={pages}
			/>
		</div>
	);
};

const getDisplayUsers = (
	users,
	{ onlyActive, search, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filterUsersByActive(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const { paginatedUsers, pages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, pages };
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTERS);

	const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTERS);
	const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USER_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE);

	return {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UsersList;
