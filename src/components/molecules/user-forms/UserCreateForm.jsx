import { useContext, useState } from 'react';

import { USER_ROLES } from '../../../constants/userRoles';
import { createUser } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import {
	CREATE_FORM_ACTIONS,
	useCreateForm
} from '../../../lib/hooks/useCreateForm';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import style from './UserCreateForm.module.css';

const UserCreateForm = () => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, isFormInvalid, dispatchCreateForm } = useCreateForm();
	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess)
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
					onChange={ev =>
						dispatchCreateForm({
							type: CREATE_FORM_ACTIONS.NAME_CHANGED,
							value: ev.target.value
						})
					}
				/>

				<InputTextAsync
					label='Username'
					name='username'
					placeholder='Username...'
					className={style.input}
					error={username.error}
					loading={username.loading}
					success={username.value && !username.loading && !username.error}
					value={username.value}
					onChange={ev =>
						dispatchCreateForm({
							type: CREATE_FORM_ACTIONS.USERNAME_CHANGED,
							value: ev.target.value
						})
					}
				/>
			</div>

			<div className={style.row}>
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
			</div>
		</form>
	);
};

const handleSubmit = async (ev, name, username, setIsSubmitting, onSuccess) => {
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
	} else {
		setIsSubmitting(false);
	}
};

export default UserCreateForm;
