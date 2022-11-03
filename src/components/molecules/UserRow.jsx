import { useState } from 'react';

import UserRole from '../atoms/UserRole';
import UserStatus from '../atoms/UserStatus';
import style from './UserRow.module.css';

const UserRow = ({ name, active, role = 'Other', ...restProps }) => {
	console.log('    - UserRow');
	const [activeState, setActiveState] = useState(active);

	return (
		<div className={style.user} {...restProps}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={activeState} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						setActiveState(!activeState);
					}}
				>
					{activeState ? 'Deactivate' : 'Activate'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
