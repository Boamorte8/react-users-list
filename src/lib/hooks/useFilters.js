import { useState } from 'react';

import { SORT_OPTIONS } from '../../constants/sortOptions.js';

export const useFilters = () => {
	const INITIAL_STATE = {
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 6
	};
	const [filters, setFilters] = useState({ ...INITIAL_STATE });
	const setSearch = search => setFilters({ ...filters, page: 1, search });
	const setOnlyActive = onlyActive => {
		const sortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;
		setFilters({ ...filters, onlyActive, sortBy, page: 1 });
	};
	const setSortBy = sortBy => setFilters({ ...filters, sortBy, page: 1 });
	const setPage = page => setFilters({ ...filters, page });
	const setItemsPerPage = itemsPerPage =>
		setFilters({ ...filters, itemsPerPage, page: 1 });
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
