import IconButton from '../../atoms/buttons/IconButton';
import CrossIcon from '../../atoms/icons/CrossIcon';
import style from './UserFormLayout.module.css';

const UserFormLayout = ({ onClose, children }) => (
	<div className={style.wrapper}>
		<IconButton
			type='button'
			filled
			className={style.close}
			icon={CrossIcon}
			onClick={onClose}
		/>

		{children}
	</div>
);

export default UserFormLayout;
