import style from './InputText.module.css';

const InputText = ({ label, error, className, ...props }) => (
	<label className={`${style.wrapper} ${className || ''}`}>
		<span className={style.label}>{label}</span>
		<input
			{...props}
			type='text'
			className={`${style.input} ${error ? style.borderError : ''}`}
			placeholder='Placeholder'
		/>
		{error && <p className={style.error}>{error}</p>}
	</label>
);

export default InputText;
