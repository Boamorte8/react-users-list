import UserDisplay from '../atoms/UserDisplay';
import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import UserActions from './UserActions';
import style from './UserCard.module.css';

const UserCard = ({ user }) => (
	<div className={style.user}>
		<div className={style.name}>
			<UserDisplay username={user.username} name={user.name} />
		</div>
		<div className={style.row}>
			<div className={style.role}>
				<UserRole role={user.role} />
			</div>
			<div className={style.status}>
				<UserStatus active={user.active} />
			</div>
			<div className={style.action}>
				<UserActions user={user} />
			</div>
		</div>
	</div>
);

export default UserCard;
