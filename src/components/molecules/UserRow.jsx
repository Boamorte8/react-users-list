import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import style from './UserRow.module.css';

const UserRow = ({ name, active, role = 'Other', ...restProps }) => (
	<div className={style.user} {...restProps}>
		<div className={style.name}>
			<span>{name}</span>
		</div>
		<div className={style.status}>
			<UserStatus active={active} />
		</div>
		<div className={style.role}>
			<UserRole role={role} />
		</div>
	</div>
);

export default UserRow;
