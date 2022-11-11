import UsersList from './components/organisms/UsersList';

const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{ username: 'cata', name: 'Catalina Osorno', active: false, role: 'other' },
	{
		username: 'jose',
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{ username: 'milo', name: 'Camilo Guerra', active: false, role: 'student' },
	{ username: 'teban', name: 'Esteban Salazar', active: true, role: 'student' },
	{
		username: 'cristian',
		name: 'Cristian Ospina',
		active: false,
		role: 'student'
	}
];

const App = () => <UsersList initialUsers={USERS} />;

export default App;
