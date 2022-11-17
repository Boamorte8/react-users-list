import { useState } from 'react';

import { deleteUser } from '../../../lib/api/usersApi';
import { useEditForm } from '../../../lib/hooks/useEditForm';
import Button from '../../atoms/buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ onSuccess, onClose, user }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name } = useEditForm(user);
	return (
		<form
			onSubmit={ev => handleSubmit(ev, user.id, setIsSubmitting, onSuccess)}
		>
			<p
				className={style.text}
			>{`Do you want to delete user "${name.value}"? Are you sure?`}</p>

			<div className={style.row}>
				<Button
					type='button'
					kind='secondary'
					disabled={isSubmitting}
					onClick={() => onClose()}
				>
					{isSubmitting ? 'Loading...' : 'Cancel'}
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Delete user'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (ev, userId, setIsSubmitting, onSuccess) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const edited = await deleteUser(userId);

	if (edited) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UserDeleteForm;
