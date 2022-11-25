import UserDisplay from '../atoms/UserDisplay';
import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import UserActions from './UserActions';
import style from './UserRow.module.css';

const UserRow = ({ user }) => (
	<div className={style.user}>
		<div className={style.name}>
			<UserDisplay
				username={user.username}
				name={user.name}
				picture={user.picture}
			/>
		</div>
		<div className={style.status}>
			<UserStatus active={user.active} />
		</div>
		<div className={style.role}>
			<UserRole role={user.role} />
		</div>
		<div className={style.action}>
			<UserActions user={user} />
		</div>
	</div>
);

export default UserRow;
