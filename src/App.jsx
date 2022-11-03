import UsersList from './components/organisms/UsersList';

const USERS = [
	{ name: 'Pablo Castellanos', active: true, role: 'teacher' },
	{ name: 'Jose Miguel Fernández', active: true, role: 'teacher' },
	{ name: 'Esteban Salazar', active: false, role: 'student' }
];

const App = () => (
	<UsersList users={USERS}>
		<h1>User List</h1>
		{/* <User
			name='Pablo Castellanos'
			active='Active'
			onClick={() => console.log('Click')}
		/>
		<User name='Jose Miguel Fernández' active='Active' />
		<User name='Esteban Salazar' active='Active' role='Student' /> */}
	</UsersList>
);

export default App;
