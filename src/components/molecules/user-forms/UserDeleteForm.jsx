import { useContext, useState } from 'react';

import { deleteUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { useEditForm } from '../../../lib/hooks/useEditForm';
import Button from '../../atoms/buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = () => {
	const { currentUser, setFiltersForm, onSuccess } =
		useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name } = useEditForm(currentUser);
	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess)
			}
		>
			<p
				className={style.text}
			>{`Do you want to delete user "${name.value}"? Are you sure?`}</p>

			<div className={style.row}>
				<Button
					type='button'
					kind='secondary'
					disabled={isSubmitting}
					onClick={setFiltersForm}
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
