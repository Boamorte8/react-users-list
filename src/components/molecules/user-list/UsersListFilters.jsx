import { useState } from 'react';

import { SORT_OPTIONS } from '../../../constants/sortOptions';
import {
	onlyActiveChanged,
	searchChanged,
	sortByChanged
} from '../../../lib/actions/filtersActions';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSearch from '../../atoms/forms/InputSearch';
import InputSelect from '../../atoms/forms/InputSelect';
import Modal from '../../atoms/modal/Modal';
import UserCreateForm from '../user-forms/UserCreateForm';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const [showModal, setShowModal] = useState(false);

	const closeModal = () => setShowModal(false);
	return (
		<div className={style.form}>
			<Modal closeModal={closeModal}>
				{showModal && <UserCreateForm closeModal={closeModal} />}
			</Modal>
			<div className={style.row}>
				<InputSearch
					name='search'
					placeholder='Search...'
					className={style.input}
					value={search}
					onChange={ev => dispatchFilters(searchChanged(ev.target.value))}
				/>

				<InputSelect
					value={sortBy}
					onChange={ev =>
						dispatchFilters(sortByChanged(Number(ev.target.value)))
					}
				>
					<option value={SORT_OPTIONS.DEFAULT}>By default</option>
					<option value={SORT_OPTIONS.NAME}>By name</option>
					<option value={SORT_OPTIONS.ROLE}>By role</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>By active</option>
					)}
				</InputSelect>
			</div>

			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						name='active'
						className={style.checkbox}
						checked={onlyActive}
						onChange={ev =>
							dispatchFilters(onlyActiveChanged(ev.target.checked))
						}
					/>
					<p>Display only actives</p>
				</div>
				<Button onClick={() => setShowModal(true)}>Add user</Button>
			</div>
		</div>
	);
};

export default UsersListFilters;
