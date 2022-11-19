import { useState } from 'react';
import { PAGINATION } from '../../constants/pagination.js';

import { SORT_OPTIONS } from '../../constants/sortOptions.js';

export const useFilters = () => {
	const INITIAL_STATE = {
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: PAGINATION.DEFAULT_PAGE,
		itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
	};
	const [filters, setFilters] = useState({ ...INITIAL_STATE });
	const setSearch = search =>
		setFilters({ ...filters, page: PAGINATION.DEFAULT_PAGE, search });
	const setOnlyActive = onlyActive => {
		const sortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;
		setFilters({
			...filters,
			onlyActive,
			sortBy,
			page: PAGINATION.DEFAULT_PAGE
		});
	};
	const setSortBy = sortBy =>
		setFilters({ ...filters, sortBy, page: PAGINATION.DEFAULT_PAGE });
	const setPage = page => setFilters({ ...filters, page });
	const setItemsPerPage = itemsPerPage =>
		setFilters({ ...filters, itemsPerPage, page: PAGINATION.DEFAULT_PAGE });
	const resetFilters = () => setFilters({ ...INITIAL_STATE });

	return {
		filters,
		filtersSetters: {
			setSearch,
			setOnlyActive,
			setSortBy
		},
		paginationSetters: {
			setPage,
			setItemsPerPage
		},
		resetFilters
	};
};
