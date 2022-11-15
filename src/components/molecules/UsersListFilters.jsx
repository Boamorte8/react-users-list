import { SORT_OPTIONS } from '../../constants/sortOptions';
import InputCheckbox from '../atoms/forms/InputCheckbox';
import InputSearch from '../atoms/forms/InputSearch';
import InputSelect from '../atoms/forms/InputSelect';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy,
	slot
}) => {
	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					name='search'
					placeholder='Search...'
					className={style.input}
					value={search}
					onChange={ev => setSearch(ev.target.value)}
				/>

				<InputSelect
					value={sortBy}
					onChange={ev => setSortBy(Number(ev.target.value))}
				>
					<option value={SORT_OPTIONS.DEFAULT}>By default</option>
					<option value={SORT_OPTIONS.NAME}>By name</option>
					<option value={SORT_OPTIONS.ROLE}>By role</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>By active</option>
					)}
				</InputSelect>
			</div>

			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						name='active'
						className={style.checkbox}
						checked={onlyActive}
						onChange={ev => setOnlyActive(ev.target.checked)}
					/>
					<p>Display only actives</p>
				</div>
				{slot}
			</div>
		</div>
	);
};

export default UsersListFilters;
