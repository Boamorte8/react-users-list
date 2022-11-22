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

export const filtersReducer = (state, action) => {
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
			return { ...FILTERS_INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};
