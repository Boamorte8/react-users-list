import { useContext, useState } from 'react';

import { deleteUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { useDeleteForm } from '../../../lib/hooks/useDeleteForm';
import Button from '../../atoms/buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name } = useDeleteForm(currentUser);
	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p
				className={style.text}
			>{`Do you want to delete user "${name}"? Are you sure?`}</p>

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
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserDeleteForm;
