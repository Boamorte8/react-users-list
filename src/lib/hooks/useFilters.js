import { useState } from 'react';

import { SORT_OPTIONS } from '#Constants/sortOptions.js';

export const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT
	});
	const setSearch = search => setFilters({ ...filters, search });
	const setOnlyActive = onlyActive => {
		const sortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;
		setFilters({ ...filters, onlyActive, sortBy });
	};
	const setSortBy = sortBy => setFilters({ ...filters, sortBy });

	return { ...filters, setSearch, setOnlyActive, setSortBy };
};
