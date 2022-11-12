import { SORT_OPTIONS } from '../../constants/sortOptions.js';
import { USER_ROLES } from '../../constants/userRoles.js';

export const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase();

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	);
};

export const filterUsersByActive = (users, active) => {
	if (!active) return [...users];

	return users.filter(user => user.active);
};

export const sortUsers = (users, sortBy) => {
	const sortUsers = [...users];
	switch (sortBy) {
		case SORT_OPTIONS.NAME:
			return sortUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		case SORT_OPTIONS.ROLE:
			return sortUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (
					a.role === USER_ROLES.TEACHER ||
					(a.role !== USER_ROLES.OTHER && b.role === USER_ROLES.OTHER)
				)
					return -1;
				return 1;
			});
		case SORT_OPTIONS.ACTIVE:
			return sortUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active) return -1;
				return 1;
			});

		default:
			return sortUsers;
	}
};

export const paginateUsers = (users, page, itemsPerPage) => {
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	return users.slice(startIndex, endIndex);
};
