import UserRow from './UserRow';

const UsersListRows = ({ users, toggleUserActive }) => {
	if (!users.length) return <p>There are not users</p>;

	return users.map(user => (
		<UserRow {...user} toggleUserActive={toggleUserActive} key={user.id} />
	));
};

export default UsersListRows;
