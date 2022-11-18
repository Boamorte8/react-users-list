import UserCard from '../UserCard';
import UserRow from '../UserRow';
import style from './UsersListRows.module.css';

const UsersListRows = ({ users, error, loading, view }) => {
	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error loading users list</p>;
	if (!users.length) return <p>There are not users</p>;

	const UserComponent = view ? UserRow : UserCard;
	return (
		<div className={style.container}>
			{users.map(user => (
				<UserComponent {...user} key={user.id} />
			))}
		</div>
	);
};

export default UsersListRows;
