import { useContext, useState } from 'react';

import { deleteUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { alertBox } from '../../../lib/events/alertEvents';
import Button from '../../atoms/buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p
				className={style.text}
			>{`Do you want to delete user "${currentUser.name}"? Are you sure?`}</p>

			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Loading...' : 'Delete user'}
			</Button>
			<Button
				type='button'
				kind='secondary'
				disabled={isSubmitting}
				onClick={closeModal}
			>
				{isSubmitting ? 'Loading...' : 'Cancel'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	ev,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const edited = await deleteUser(userId);

	if (edited) {
		onSuccess();
		alertBox.success('User deleted successfully');
	} else {
		alertBox.error('Error deleting user');
	}
	closeModal();
};

export default UserDeleteForm;
