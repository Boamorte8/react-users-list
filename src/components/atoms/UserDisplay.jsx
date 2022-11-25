import style from './UserDisplay.module.css';

const UserDisplay = ({ name, username, picture }) => {
	return (
		<div className={style.container}>
			<img
				className={style.picture}
				src={picture || '/user-pic.svg'}
				alt='User picture'
			/>
			<div>
				<p className={style.name}>{name}</p>
				<p className={style.username}>{`@${username}`}</p>
			</div>
		</div>
	);
};

export default UserDisplay;
