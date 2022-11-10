import UserDisplay from '../atoms/UserDisplay';
import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import style from './UserRow.module.css';

const UserRow = ({ username, name, active, role = 'Other' }) => {
	return (
		<div className={style.user}>
			<div className={style.name}>
				<UserDisplay username={username} name={name} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}></div>
		</div>
	);
};

export default UserRow;
