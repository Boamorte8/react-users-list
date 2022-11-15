import { useState } from 'react';

import { USER_FORMS } from '../../constants/userForms.js';
import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import Button from '../atoms/buttons/Button.jsx';
import UserCreateForm from '../molecules/user-forms/UserCreateForm.jsx';
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
		search,
		onlyActive,
		sortBy,
		page,
		itemsPerPage,
		setPage,
		setItemsPerPage,
		...setFiltersFunctions
	} = useFilters();

	const { users, pages, error, loading } = useUsers({
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

			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					search={search}
					onlyActive={onlyActive}
					sortBy={sortBy}
					slot={<Button onClick={setCreateForm}>Add user</Button>}
					{...setFiltersFunctions}
				/>
			) : (
				<UserCreateForm onClose={setFiltersForm} />
			)}
			<UsersListRows users={users} error={error} loading={loading} />
			<UsersListPagination {...pagination} />
		</div>
	);
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
