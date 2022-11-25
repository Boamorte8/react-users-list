import { useState } from 'react';

import IconButton from '../atoms/buttons/IconButton';
import PencilIcon from '../atoms/icons/PencilIcon';
import TrashIcon from '../atoms/icons/TrashIcon';
import Modal from '../atoms/modal/Modal';
import UserDeleteForm from './user-forms/UserDeleteForm';
import UserEditForm from './user-forms/UserEditForm';

const UserActions = ({ user }) => {
	const [modalContent, setModalContent] = useState();
	const closeModal = () => setModalContent();
	return (
		<>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton
				icon={PencilIcon}
				onClick={() =>
					setModalContent(
						<UserEditForm currentUser={user} closeModal={closeModal} />
					)
				}
			/>
			<IconButton
				icon={TrashIcon}
				kind='error'
				onClick={() =>
					setModalContent(
						<UserDeleteForm currentUser={user} closeModal={closeModal} />
					)
				}
			/>
		</>
	);
};

export default UserActions;
