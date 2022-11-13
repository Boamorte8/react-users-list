import UserRow from './UserRow';

const UsersListRows = ({ users, error, loading }) => {
	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error loading users list</p>;
	if (!users.length) return <p>There are not users</p>;

	return users.map(user => <UserRow {...user} key={user.id} />);
};

export default UsersListRows;
