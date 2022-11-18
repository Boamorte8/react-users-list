import GridViewIcon from '../../atoms/icons/GridViewIcon.jsx';
import ListViewIcon from '../../atoms/icons/ListViewIcon.jsx';
import style from './UsersListViewSelector.module.css';

const UsersListViewSelector = ({ view, setView }) => {
	return (
		<div className={style.wrapper}>
			<button
				className={style.button}
				onClick={() => setView(false)}
				disabled={!view}
			>
				<GridViewIcon className={style.icon} />
			</button>
			<button
				className={style.button}
				onClick={() => setView(true)}
				disabled={view}
			>
				<ListViewIcon className={style.icon} />
			</button>
		</div>
	);
};

export default UsersListViewSelector;
