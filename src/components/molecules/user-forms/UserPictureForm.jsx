import { useContext, useRef, useState } from 'react';

import { updateUserPicture } from '../../../lib/api/usersApi';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { fileToDataURL } from '../../../lib/utils/file-utils';
import Button from '../../atoms/buttons/Button';
import IconButton from '../../atoms/buttons/IconButton';
import PencilIcon from '../../atoms/icons/PencilIcon';
import PictureIcon from '../../atoms/icons/PictureIcon';
import style from './UserPictureForm.module.css';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const MAX_SIZE = 102400;

const UserPictureForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [preview, setPreview] = useState();
	const inputRef = useRef(null);

	const message = getMessage(preview);
	return (
		<div className={style.wrapper}>
			<div className={style.preview}>
				{preview && preview.src ? (
					<img
						src={preview.src}
						className={style.picture}
						alt='Preview user picture'
					/>
				) : (
					<PictureIcon className={style.image} />
				)}
				<IconButton
					icon={PencilIcon}
					filled
					className={style.select}
					onClick={() => inputRef.current.click()}
				/>
			</div>

			{message}

			<input
				className={style.input}
				type='file'
				ref={inputRef}
				accept={ALLOWED_MIME_TYPES.join(',')}
				onChange={ev => handleChange(ev, setPreview)}
			/>
			<Button
				type='button'
				className={style.button}
				disabled={!preview || !preview.src || isSubmitting}
				onClick={() =>
					handleClick(
						currentUser.id,
						preview,
						setIsSubmitting,
						onSuccess,
						closeModal
					)
				}
			>
				{isSubmitting ? 'Loading...' : 'Update picture'}
			</Button>
		</div>
	);
};

const getMessage = preview => {
	if (!preview) return <span>JGP/PNG | Max. 100Kb</span>;
	if (preview.filename)
		return <span className={style.filename}>{preview.filename}</span>;
	return <span className={style.error}>{preview.error}</span>;
};

const handleChange = async (event, setPreview) => {
	const file = event.target.files[0];

	if (!file) return setPreview();

	if (!ALLOWED_MIME_TYPES.includes(file.type))
		return setPreview({ error: 'Only allowed jpg/png files' });

	if (file.size > MAX_SIZE) return setPreview({ error: 'Max size is 100KB' });

	try {
		const dataUrl = await fileToDataURL(file);

		setPreview({ src: dataUrl, filename: file.name });
	} catch (error) {
		setPreview({ error: error.message });
	}
};

const handleClick = async (
	userId,
	preview,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	if (!preview) return;

	setIsSubmitting(true);
	const updated = await updateUserPicture(userId, preview.src);
	if (updated) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserPictureForm;
