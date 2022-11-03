import UserRow from '../molecules/UserRow';
import style from './UsersList.module.css';

const UsersList = ({ users, children }) => {
	const usersRendered =
		users.length > 0 ? (
			users.map(user => <UserRow {...user} key={user.name} />)
		) : (
			<p>There are not users</p>
		);
	return (
		<div className={style.list}>
			{children} {usersRendered}
		</div>
	);
};

export default UsersList;
