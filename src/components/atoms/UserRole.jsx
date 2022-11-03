import style from './UserRole.module.css';

const ROLE_STYLES = {
	teacher: ['Teacher', style.teacher],
	student: ['Student', style.student],
	other: ['Other', style.other]
};

const UserRole = ({ role }) => {
	console.log('      - UserRole');

	const [roleName, roleStyles] = ROLE_STYLES[role] || ROLE_STYLES.other;
	return <span className={`${style.role} ${roleStyles}`}>{roleName}</span>;
};

export default UserRole;
