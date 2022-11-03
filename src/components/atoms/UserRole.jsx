import style from './UserRole.module.css';

const UserRole = ({ role }) => {
	const ROLE_STYLES = {
		teacher: ['Teacher', style.teacher],
		student: ['Student', style.student],
		other: ['Other', style.other]
	};

	const [roleName, roleStyles] = ROLE_STYLES[role] || ROLE_STYLES.other;
	return <span className={`${style.role} ${roleStyles}`}>{roleName}</span>;
};

export default UserRole;
