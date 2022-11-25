import { useState } from 'react';

import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../atoms/buttons/IconButton';
import DotsIcon from '../atoms/icons/DotsIcon';
import PencilIcon from '../atoms/icons/PencilIcon';
import PictureIcon from '../atoms/icons/PictureIcon';
import TrashIcon from '../atoms/icons/TrashIcon';
import Modal from '../atoms/modal/Modal';
import UserDeleteForm from './user-forms/UserDeleteForm';
import UserEditForm from './user-forms/UserEditForm';
import UserPictureForm from './user-forms/UserPictureForm';
import style from './UserActions.module.css';

const UserActions = ({ user }) => {
	const {
		modalContent,
		closeModal,
		openDeleteModal,
		openEditModal,
		openPictureModal
	} = useModal(user);
	const { openedDropdown, dropdownRef, openDropdown, closeDropdown } =
		useDropdown();

	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={openDropdown} />
			{openedDropdown && (
				<ul
					ref={dropdownRef}
					className={style.dropdown}
					onClick={closeDropdown}
				>
					<li className={style.item} onClick={openEditModal}>
						<PencilIcon className={style.icon} />
						<span className={style.text}>Edit</span>
					</li>
					<li className={style.item} onClick={openPictureModal}>
						<PictureIcon className={style.icon} />
						<span className={style.text}>Change picture</span>
					</li>
					<li className={style.item} onClick={openDeleteModal}>
						<TrashIcon className={style.icon} />
						<span className={style.text}>Delete</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = user => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () =>
		setModalContent(
			<UserEditForm currentUser={user} closeModal={closeModal} />
		);

	const openPictureModal = () =>
		setModalContent(
			<UserPictureForm currentUser={user} closeModal={closeModal} />
		);

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm currentUser={user} closeModal={closeModal} />
		);

	return {
		modalContent,
		closeModal,
		openDeleteModal,
		openEditModal,
		openPictureModal
	};
};

export default UserActions;
