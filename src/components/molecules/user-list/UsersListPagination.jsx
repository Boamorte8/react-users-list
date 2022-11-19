import InputSelect from '../../atoms/forms/InputSelect.jsx';
import PageSelector from '../PageSelector.jsx';
import style from './UsersListPagination.module.css';

const UsersListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	totalUsers
}) => {
	const optionsItems = [4, 6, 8];
	const items = optionsItems.map(item => (
		<option value={item} key={item}>
			{item}
		</option>
	));

	return (
		<div className={style.wrapper}>
			<div className={style.selector}>
				<InputSelect
					value={itemsPerPage}
					onChange={ev => setItemsPerPage(Number(ev.target.value))}
				>
					{items}
				</InputSelect>
				<p>Elements per page</p>
			</div>
			<PageSelector
				pages={Math.ceil(totalUsers / itemsPerPage)}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
};

export default UsersListPagination;
