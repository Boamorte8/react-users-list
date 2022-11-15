import { useState } from 'react';
import { USER_ROLES } from '../../../constants/userRoles';
import { useCreateForm } from '../../../lib/hooks/useCreateForm';
import Button from '../../atoms/buttons/Button';
import IconButton from '../../atoms/buttons/IconButton';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import CrossIcon from '../../atoms/icons/CrossIcon';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ onClose }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, setName, setUsername } = useCreateForm();
	const isDisabled =
		!name.value ||
		!!name.error ||
		!username.value ||
		!!username.error ||
		username.loading ||
		isSubmitting;
	return (
		<div className={style.wrapper}>
			<IconButton
				type='button'
				filled
				className={style.close}
				icon={CrossIcon}
				onClick={onClose}
			/>

			<form
				onSubmit={ev =>
					handleSubmit(ev, name, username, setIsSubmitting, onClose)
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
						success={username.value && !username.loading && !username.error}
						value={username.value}
						onChange={ev => setUsername(ev.target.value)}
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

					<Button type='submit' disabled={isDisabled}>
						{isSubmitting ? 'Loading...' : 'Create user'}
					</Button>
				</div>
			</form>
		</div>
	);
};

const handleSubmit = async (ev, name, username, setIsSubmitting, onClose) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	const res = await fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	});

	if (res.ok) {
		// TODO: Update the user list
		onClose();
	} else setIsSubmitting(false);
};

export default UserCreateForm;
