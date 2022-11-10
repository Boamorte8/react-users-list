import style from './UserDisplay.module.css';

const UserDisplay = ({ name, username, image }) => {
	const img = image ? (
		<img className={style.image} src={image} alt='User image' />
	) : null;
	return (
		<div className={style.container}>
			{img}
			<div>
				<p className={style.name}>{name}</p>
				<p className={style.username}>{`@${username}`}</p>
			</div>
		</div>
	);
};

export default UserDisplay;
