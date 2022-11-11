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
	setSortBy
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
					<option value={0}>By default</option>
					<option value={1}>By name</option>
					<option value={2}>By role</option>
					{!onlyActive && <option value={3}>By active</option>}
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
			</div>
		</div>
	);
};
/* Uncontrolled form
  <form
    onSubmit={ev => {
      ev.preventDefault();
      setSearch(ev.target.search.value);
    }}
  >
    <input type='text' name='search' placeholder='Search' />
    <button type='submit'>Search</button>
  </form> */

export default UsersListFilters;
