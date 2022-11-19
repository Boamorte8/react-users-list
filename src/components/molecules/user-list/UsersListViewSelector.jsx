import GridViewIcon from '../../atoms/icons/GridViewIcon.jsx';
import ListViewIcon from '../../atoms/icons/ListViewIcon.jsx';
import style from './UsersListViewSelector.module.css';

const UsersListViewSelector = ({ showRowsFormat, setShowRowsFormat }) => {
	return (
		<div className={style.wrapper}>
			<button
				className={style.button}
				onClick={() => setShowRowsFormat(false)}
				disabled={!showRowsFormat}
			>
				<GridViewIcon className={style.icon} />
			</button>
			<button
				className={style.button}
				onClick={() => setShowRowsFormat(true)}
				disabled={showRowsFormat}
			>
				<ListViewIcon className={style.icon} />
			</button>
		</div>
	);
};

export default UsersListViewSelector;
