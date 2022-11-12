import style from './IconButton.module.css';

const CLASSNAMES = {
	normal: {
		normal: style.normal,
		filled: style.normalFilled
	},
	error: {
		normal: style.error,
		filled: style.errorFilled
	}
};

const IconButton = ({
	kind = 'normal',
	filled,
	icon: Icon,
	className,
	...props
}) => {
	const classNames = CLASSNAMES[kind];
	const classNameKey = filled ? 'filled' : 'normal';
	const kindClassName = classNames[classNameKey];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className || ''}`}
		>
			<Icon className={style.icon} />
		</button>
	);
};

export default IconButton;
