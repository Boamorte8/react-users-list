import SearchIcon from '../icons/SearchIcon';
import style from './InputSearch.module.css';

const InputSearch = ({ className, ...props }) => (
	<div className={`${style.wrapper} ${className || ''}`}>
		<SearchIcon className={style.icon} />
		<input {...props} type='text' className={style.input} />
	</div>
);

export default InputSearch;
