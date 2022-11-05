import UsersList from './components/organisms/UsersList';

const USERS = [
	{ id: 0, name: 'Pablo Castellanos', active: true, role: 'teacher' },
	{ id: 1, name: 'Jose Miguel Fernández', active: true, role: 'teacher' },
	{ id: 2, name: 'Esteban Salazar', active: true, role: 'student' },
	{ id: 3, name: 'Catalina Osorno', active: false, role: 'student' },
	{ id: 4, name: 'Camilo Guerra', active: false, role: 'student' }
];

const App = () => <UsersList initialUsers={USERS} />;
/* <User
				name='Pablo Castellanos'
				active='Active'
				onClick={() => console.log('Click')}
			/>
			<User name='Jose Miguel Fernández' active='Active' />
			<User name='Esteban Salazar' active='Active' role='Student' /> */
/* </UsersList> */

export default App;
