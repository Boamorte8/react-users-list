import { useEffect, useState } from 'react';

import { USER_ROLES } from '../../../constants/userRoles';
import {
	validateName,
	validateUsername
} from '../../../lib/users/userValidations';
import Button from '../../atoms/buttons/Button';
import IconButton from '../../atoms/buttons/IconButton';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSelect from '../../atoms/forms/InputSelect';
import InputText from '../../atoms/forms/InputText';
import InputTextAsync from '../../atoms/forms/InputTextAsync';
import CrossIcon from '../../atoms/icons/CrossIcon';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ onClose }) => {
	const { name, username, setName, setUsername } = useFormValues();
	return (
		<form className={style.form}>
			<IconButton
				filled
				className={style.close}
				icon={CrossIcon}
				onClick={onClose}
			/>

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

				<Button type='submit'>Create user</Button>
			</div>
		</form>
	);
};

const validateUsernameAsync = async (username, setFormValues) => {
	let error;
	const res = await fetch(`http://localhost:4000/users?username=${username}`);
	if (res.ok) {
		const data = await res.json();
		if (data.length) error = 'Username already in use';
	} else {
		error = 'Error validating';
	}
	setFormValues(prevFormValues => ({
		...prevFormValues,
		username: {
			value: username,
			loading: false,
			error
		}
	}));
};

const useFormValues = () => {
	const [formValues, setFormValues] = useState({
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	useEffect(() => {
		if (formValues.username.loading)
			validateUsernameAsync(formValues.username.value, setFormValues);

		// return () => {
		// 	second
		// }
	}, [formValues.username.value, formValues.username.loading]);

	const setName = name => {
		const error = validateName(name);
		setFormValues({ ...formValues, name: { value: name, error } });
	};
	const setUsername = username => {
		const error = validateUsername(username);
		setFormValues({
			...formValues,
			username: { value: username, loading: !error, error }
		});
	};

	return {
		...formValues,
		setName,
		setUsername
	};
};

export default UserCreateForm;
