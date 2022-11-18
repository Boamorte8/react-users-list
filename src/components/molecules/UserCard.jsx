import { useContext } from 'react';

import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import IconButton from '../atoms/buttons/IconButton';
import PencilIcon from '../atoms/icons/PencilIcon';
import TrashIcon from '../atoms/icons/TrashIcon';
import UserDisplay from '../atoms/UserDisplay';
import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import style from './UserCard.module.css';

const UserCard = ({ id, username, name, active, role = 'Other' }) => {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);
	return (
		<div className={style.user}>
			<div className={style.name}>
				<UserDisplay username={username} name={name} />
			</div>
			<div className={style.row}>
				<div className={style.role}>
					<UserRole role={role} />
				</div>
				<div className={style.status}>
					<UserStatus active={active} />
				</div>
				<div className={style.action}>
					<IconButton
						icon={PencilIcon}
						onClick={() =>
							setEditForm({
								id,
								username,
								name,
								active,
								role
							})
						}
					/>
					<IconButton
						icon={TrashIcon}
						kind='error'
						onClick={() =>
							setDeleteForm({
								id,
								name
							})
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
