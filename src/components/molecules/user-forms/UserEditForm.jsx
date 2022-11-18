import { useContext, useState } from 'react';

import { USER_ROLES } from '../../../constants/userRoles';
import { updateUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { useEditForm } from '../../../lib/hooks/useEditForm';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import style from './UserEditForm.module.css';

const UserEditForm = () => {
	const { currentUser, onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		name,
		username,
		active,
		role,
		isFormInvalid,
		setName,
		setUsername,
		setActive,
		setRole
	} = useEditForm(currentUser);
	return (
		<form
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
					onSuccess
				)
			}
		>
			<div className={style.row}>
				<InputText
					label='Name'
					name='name'
					placeholder='Name...'
					className={style.input}
					error={name.error}
					value={name.value}
					onChange={ev => setName(ev.target.value)}
				/>

				<InputTextAsync
					label='Username'
					name='username'
					placeholder='Username...'
					className={style.input}
					error={username.error}
					loading={username.loading}
					success={
						username.value !== currentUser.username &&
						!username.loading &&
						!username.error
					}
					value={username.value}
					onChange={ev => setUsername(ev.target.value)}
				/>
			</div>

			<div className={style.row}>
				<InputSelect
					name='role'
					value={role}
					onChange={ev => setRole(ev.target.value)}
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
						onChange={ev => setActive(ev.target.checked)}
					/>
					<span>¿Active?</span>
				</div>

				<Button type='submit' disabled={isFormInvalid || isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Edit user'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (ev, user, setIsSubmitting, onSuccess) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const edited = await updateUser(user);

	if (edited) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UserEditForm;
