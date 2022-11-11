import ArrowDownIcon from '../icons/ArrowDownIcon';
import style from './InputSelect.module.css';

const InputSelect = ({ className, ...props }) => (
	<div className={`${style.wrapper} ${className || ''}`}>
		<select {...props} className={style.select}></select>
		<ArrowDownIcon className={style.icon} />
	</div>
);

export default InputSelect;
