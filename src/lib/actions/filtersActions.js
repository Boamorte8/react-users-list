import { FILTERS_ACTIONS } from '../../constants/filtersActions';

export const searchChanged = payload => ({
	type: FILTERS_ACTIONS.SEARCH_CHANGED,
	payload
});

export const onlyActiveChanged = payload => ({
	type: FILTERS_ACTIONS.ONLY_ACTIVE_CHANGED,
	payload
});

export const sortByChanged = payload => ({
	type: FILTERS_ACTIONS.SORT_BY_CHANGED,
	payload
});

export const pageChanged = payload => ({
	type: FILTERS_ACTIONS.PAGE_CHANGED,
	payload
});

export const itemsPerPageChanged = payload => ({
	type: FILTERS_ACTIONS.ITEMS_PER_PAGE_CHANGED,
	payload
});

export const resetFilters = () => ({ type: FILTERS_ACTIONS.RESET_FILTERS });
