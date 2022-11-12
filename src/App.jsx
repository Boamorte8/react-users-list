import UsersList from './components/organisms/UsersList.jsx';
import { USER_ROLES } from './constants/userRoles.js';

const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: USER_ROLES.TEACHER
	},
	{
		username: 'cata',
		name: 'Catalina Osorno',
		active: false,
		role: USER_ROLES.OTHER
	},
	{
		username: 'jose',
		name: 'Jose Miguel Fernández',
		active: true,
		role: USER_ROLES.TEACHER
	},
	{
		username: 'milo',
		name: 'Camilo Guerra',
		active: false,
		role: USER_ROLES.STUDENT
	},
	{
		username: 'teban',
		name: 'Esteban Salazar',
		active: true,
		role: USER_ROLES.STUDENT
	},
	{
		username: 'cristian',
		name: 'Cristian Ospina',
		active: false,
		role: USER_ROLES.STUDENT
	}
];

const App = () => <UsersList initialUsers={USERS} />;

export default App;
