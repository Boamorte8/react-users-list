import { FILTERS_ACTIONS } from '../../../constants/filtersActions.js';
import { PAGINATION } from '../../../constants/pagination.js';
import InputSelect from '../../atoms/forms/InputSelect.jsx';
import PageSelector from '../PageSelector.jsx';
import style from './UsersListPagination.module.css';

const UsersListPagination = ({
	page,
	itemsPerPage,
	dispatchFilters,
	totalUsers
}) => {
	const items = PAGINATION.ITEMS_PER_PAGE_VALUES.map(item => (
		<option value={item} key={item}>
			{item}
		</option>
	));

	return (
		<div className={style.wrapper}>
			<div className={style.selector}>
				<InputSelect
					value={itemsPerPage}
					onChange={ev =>
						dispatchFilters({
							type: FILTERS_ACTIONS.ITEMS_PER_PAGE_CHANGED,
							value: Number(ev.target.value)
						})
					}
				>
					{items}
				</InputSelect>
				<p>Elements per page</p>
			</div>
			<PageSelector
				pages={Math.ceil(totalUsers / itemsPerPage)}
				page={page}
				setPage={newPage =>
					dispatchFilters({
						type: FILTERS_ACTIONS.PAGE_CHANGED,
						value: newPage
					})
				}
			/>
		</div>
	);
};

export default UsersListPagination;
