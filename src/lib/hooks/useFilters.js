import { useReducer } from 'react';

import { PAGINATION } from '../../constants/pagination.js';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const FILTERS_ACTIONS = {
	SEARCH_CHANGED: 'SEARCH_CHANGED',
	ONLY_ACTIVE_CHANGED: 'ONLY_ACTIVE_CHANGED',
	SORT_BY_CHANGED: 'SORT_BY_CHANGED',
	PAGE_CHANGED: 'PAGE_CHANGED',
	ITEMS_PER_PAGE_CHANGED: 'ITEMS_PER_PAGE_CHANGED',
	RESET_FILTERS: 'RESET_FILTERS'
};

const filtersReducer = (state, action) => {
	switch (action.type) {
		case FILTERS_ACTIONS.SEARCH_CHANGED:
			return {
				...state,
				search: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.ONLY_ACTIVE_CHANGED: {
			const sortBy =
				action.value && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;
			return {
				...state,
				onlyActive: action.value,
				sortBy,
				page: PAGINATION.DEFAULT_PAGE
			};
		}
		case FILTERS_ACTIONS.SORT_BY_CHANGED:
			return {
				...state,
				sortBy: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.PAGE_CHANGED:
			return { ...state, page: action.value };
		case FILTERS_ACTIONS.ITEMS_PER_PAGE_CHANGED:
			return {
				...state,
				itemsPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.RESET_FILTERS:
			return { ...INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};

export const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, {
		...INITIAL_STATE
	});

	return { filters, dispatchFilters };
};
