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
		<form className={style.form}>
			<input
				type='text'
				name='search'
				placeholder='Search'
				value={search}
				onChange={ev => setSearch(ev.target.value)}
			/>

			<div className={style.active}>
				<input
					type='checkbox'
					name='active'
					className={style.checkbox}
					checked={onlyActive}
					onChange={ev => setOnlyActive(ev.target.checked)}
				/>
				<span>Only actives</span>
			</div>

			<select
				value={sortBy}
				onChange={ev => setSortBy(Number(ev.target.value))}
			>
				<option value={0}>By default</option>
				<option value={1}>By name</option>
			</select>
		</form>
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
