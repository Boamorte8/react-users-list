import { useContext, useState } from 'react';

import { USER_ROLES } from '../../../constants/userRoles';
import {
	activeChangedEditForm,
	nameChangedEditForm,
	roleChangedEditForm,
	usernameChangedEditForm
} from '../../../lib/actions/editFormActions';
import { updateUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { useEditForm } from '../../../lib/hooks/useEditForm';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import style from './UserEditForm.module.css';

const UserEditForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, active, role, isFormInvalid, dispatchEditForm } =
		useEditForm(currentUser);
	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(
					ev,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						active,
						role
					},
					setIsSubmitting,
					onSuccess,
					closeModal
				)
			}
		>
			<InputText
				label='Name'
				name='name'
				placeholder='Name...'
				error={name.error}
				value={name.value}
				onChange={ev => dispatchEditForm(nameChangedEditForm(ev.target.value))}
			/>

			<InputTextAsync
				label='Username'
				name='username'
				placeholder='Username...'
				error={username.error}
				loading={username.loading}
				success={
					username.value !== currentUser.username &&
					!username.loading &&
					!username.error
				}
				value={username.value}
				onChange={ev =>
					dispatchEditForm(
						usernameChangedEditForm(ev.target.value, currentUser.username)
					)
				}
			/>

			<InputSelect
				name='role'
				value={role}
				onChange={ev => dispatchEditForm(roleChangedEditForm(ev.target.value))}
			>
				<option value={USER_ROLES.TEACHER}>Teacher</option>
				<option value={USER_ROLES.STUDENT}>Student</option>
				<option value={USER_ROLES.OTHER}>Other</option>
			</InputSelect>

			<div className={style.active}>
				<InputCheckbox
					name='active'
					className={style.checkbox}
					checked={active}
					onChange={ev =>
						dispatchEditForm(activeChangedEditForm(ev.target.checked))
					}
				/>
				<span>¿Active?</span>
			</div>

			<Button type='submit' disabled={isFormInvalid || isSubmitting}>
				{isSubmitting ? 'Loading...' : 'Edit user'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	ev,
	user,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const edited = await updateUser(user);

	if (edited) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserEditForm;
