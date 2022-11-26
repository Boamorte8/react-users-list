import { useContext, useState } from 'react';

import { USER_ROLES } from '../../../constants/userRoles';
import {
	nameChangedCreateForm,
	usernameChangedCreateForm
} from '../../../lib/actions/createFormActions';
import { createUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { alertBox } from '../../../lib/events/alertEvents';
import { useCreateForm } from '../../../lib/hooks/useCreateForm';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, isFormInvalid, dispatchCreateForm } = useCreateForm();
	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<InputText
				label='Name'
				name='name'
				placeholder='Name...'
				error={name.error}
				value={name.value}
				onChange={ev =>
					dispatchCreateForm(nameChangedCreateForm(ev.target.value))
				}
			/>

			<InputTextAsync
				label='Username'
				name='username'
				placeholder='Username...'
				error={username.error}
				loading={username.loading}
				success={username.value && !username.loading && !username.error}
				value={username.value}
				onChange={ev =>
					dispatchCreateForm(usernameChangedCreateForm(ev.target.value))
				}
			/>

			<InputSelect name='role'>
				<option value={USER_ROLES.TEACHER}>Teacher</option>
				<option value={USER_ROLES.STUDENT}>Student</option>
				<option value={USER_ROLES.OTHER}>Other</option>
			</InputSelect>

			<div className={style.active}>
				<InputCheckbox name='active' className={style.checkbox} />
				<span>¿Active?</span>
			</div>

			<Button type='submit' disabled={isFormInvalid || isSubmitting}>
				{isSubmitting ? 'Loading...' : 'Create user'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	ev,
	name,
	username,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	const created = await createUser(user);

	if (created) {
		onSuccess();
		alertBox.success('User created successfully');
	} else {
		alertBox.error('Error creating user');
	}
	closeModal();
};

export default UserCreateForm;
