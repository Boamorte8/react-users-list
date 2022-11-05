import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import style from './UserRow.module.css';

const UserRow = ({ id, name, active, role = 'Other', toggleUserActive }) => (
	<div className={style.user}>
		<div className={style.name}>
			<span>{name}</span>
		</div>
		<div className={style.status}>
			<UserStatus active={active} />
		</div>
		<div className={style.role}>
			<UserRole role={role} />
		</div>
		<div className={style.action}>
			<button
				onClick={() => {
					toggleUserActive(id);
				}}
			>
				{active ? 'Deactivate' : 'Activate'}
			</button>
		</div>
	</div>
);

export default UserRow;
