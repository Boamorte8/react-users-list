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
import UserDeleteForm from '../molecules/user-forms/UserDeleteForm.jsx';
import UserEditForm from '../molecules/user-forms/UserEditForm.jsx';
import UserFormLayout from '../molecules/user-forms/UserFormLayout.jsx';
import UsersListFilters from '../molecules/UsersListFilters';
import UsersListPagination from '../molecules/UsersListPagination.jsx';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = () => {
	const {
		currentForm,
		currentUser,
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
					{currentForm === USER_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USER_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							onClose={setFiltersForm}
							user={currentUser}
						/>
					)}
				</UserFormLayout>
			)}
			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
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
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTERS });

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	const setEditForm = user => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = user =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UsersList;
