import { useFilters } from '../../lib/hooks/useFilters.js';
import { useUsers } from '../../lib/hooks/useUsers.js';
import UsersListFilters from '../molecules/UsersListFilters';
import UsersListPagination from '../molecules/UsersListPagination.jsx';
import UsersListRows from '../molecules/UsersListRows';
import style from './UsersList.module.css';

const UsersList = () => {
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

			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
			<UsersListRows users={users} error={error} loading={loading} />
			<UsersListPagination {...pagination} />
		</div>
	);
};

export default UsersList;
