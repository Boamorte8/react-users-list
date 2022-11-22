import { PAGINATION } from '../../../constants/pagination.js';
import {
	itemsPerPageChanged,
	pageChanged
} from '../../../lib/actions/filtersActions.js';
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
						dispatchFilters(itemsPerPageChanged(Number(ev.target.value)))
					}
				>
					{items}
				</InputSelect>
				<p>Elements per page</p>
			</div>
			<PageSelector
				pages={Math.ceil(totalUsers / itemsPerPage)}
				page={page}
				setPage={newPage => dispatchFilters(pageChanged(newPage))}
			/>
		</div>
	);
};

export default UsersListPagination;
