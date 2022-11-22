import { useContext } from 'react';

import { SORT_OPTIONS } from '../../../constants/sortOptions';
import { USER_FORMS } from '../../../constants/userForms';
import { UserFormsContext } from '../../../lib/contexts/UserFormsContext';
import { FILTERS_ACTIONS } from '../../../lib/hooks/useFilters';
import Button from '../../atoms/buttons/Button';
import InputCheckbox from '../../atoms/forms/InputCheckbox';
import InputSearch from '../../atoms/forms/InputSearch';
import InputSelect from '../../atoms/forms/InputSelect';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const { currentForm, setCreateForm } = useContext(UserFormsContext);

	if (currentForm !== USER_FORMS.FILTERS) return null;
	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					name='search'
					placeholder='Search...'
					className={style.input}
					value={search}
					onChange={ev =>
						dispatchFilters({
							type: FILTERS_ACTIONS.SEARCH_CHANGED,
							value: ev.target.value
						})
					}
				/>

				<InputSelect
					value={sortBy}
					onChange={ev =>
						dispatchFilters({
							type: FILTERS_ACTIONS.SORT_BY_CHANGED,
							value: Number(ev.target.value)
						})
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
							dispatchFilters({
								type: FILTERS_ACTIONS.ONLY_ACTIVE_CHANGED,
								value: ev.target.checked
							})
						}
					/>
					<p>Display only actives</p>
				</div>
				<Button onClick={setCreateForm}>Add user</Button>
			</div>
		</div>
	);
};

export default UsersListFilters;
