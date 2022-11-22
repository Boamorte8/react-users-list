import { FILTERS_ACTIONS } from '../../constants/filtersActions';
import { PAGINATION } from '../../constants/pagination';
import { SORT_OPTIONS } from '../../constants/sortOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const filtersReducer = (state, { type, payload }) => {
	switch (type) {
		case FILTERS_ACTIONS.SEARCH_CHANGED:
			return {
				...state,
				search: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.ONLY_ACTIVE_CHANGED: {
			const sortBy =
				payload && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;
			return {
				...state,
				onlyActive: payload,
				sortBy,
				page: PAGINATION.DEFAULT_PAGE
			};
		}
		case FILTERS_ACTIONS.SORT_BY_CHANGED:
			return {
				...state,
				sortBy: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.PAGE_CHANGED:
			return { ...state, page: payload };
		case FILTERS_ACTIONS.ITEMS_PER_PAGE_CHANGED:
			return {
				...state,
				itemsPerPage: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.RESET_FILTERS:
			return { ...FILTERS_INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};
