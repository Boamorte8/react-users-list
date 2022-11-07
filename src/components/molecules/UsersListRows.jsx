import UserRow from './UserRow';

const UsersListRows = ({ users }) => {
	if (!users.length) return <p>There are not users</p>;

	return users.map(user => <UserRow {...user} key={user.id} />);
};

export default UsersListRows;
