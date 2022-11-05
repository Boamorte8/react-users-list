import style from './UserStatus.module.css';

const UserStatus = ({ active }) => {
	const activeClassname = active ? style.active : style.inactive;
	return (
		<span className={activeClassname}>{active ? 'Active' : 'Inactive'}</span>
	);
};

export default UserStatus;
