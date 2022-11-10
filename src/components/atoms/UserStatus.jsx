import CheckCircleIcon from './icons/CheckCircleIcon';
import CrossCircleIcon from './icons/CrossCircleIcon';
import style from './UserStatus.module.css';

const UserStatus = ({ active }) => {
	let activeClassname, text, Icon;
	if (active) {
		activeClassname = style.active;
		text = 'Active';
		Icon = CheckCircleIcon;
	} else {
		activeClassname = style.inactive;
		text = 'Inactive';
		Icon = CrossCircleIcon;
	}
	return (
		<div className={`${style.container} ${activeClassname}`}>
			<Icon className={style.icon} />
			<span className={style.status}>{text}</span>
		</div>
	);
};

export default UserStatus;
