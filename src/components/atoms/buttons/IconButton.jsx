import style from './IconButton.module.css';

const IconButton = ({
	kind = 'black',
	filled = true,
	icon: Icon,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={`${style.button} ${filled ? style.filled : ''} ${
				style[kind]
			} ${className || ''}`}
		>
			<Icon
				className={`${style.icon} ${!filled ? style.filledIcon : ''} ${
					style[kind]
				}`}
			/>
		</button>
	);
};

export default IconButton;
