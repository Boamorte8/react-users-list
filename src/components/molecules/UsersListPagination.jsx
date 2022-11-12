import IconButton from '../atoms/buttons/IconButton.jsx';
import InputSelect from '../atoms/forms/InputSelect.jsx';
import ArrowDownIcon from '../atoms/icons/ArrowDownIcon.jsx';
import style from './UsersListPagination.module.css';

const UsersListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage
}) => {
	const optionsItems = [2, 3, 4];
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
			<IconButton icon={ArrowDownIcon} />
		</div>
	);
};

export default UsersListPagination;
