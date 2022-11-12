import IconButton from '../atoms/buttons/IconButton';
import ArrowDownIcon from '../atoms/icons/ArrowDownIcon';
import style from './PageSelector.module.css';

const PageSelector = ({ pages, page, setPage }) => {
	const isLastPage = page === pages || pages === 0;
	return (
		<div className={style.wrapper}>
			<IconButton
				filled
				disabled={page === 1}
				className={style.arrowLeft}
				icon={ArrowDownIcon}
				onClick={() => setPage(page - 1)}
			/>
			<p>
				Page {page} of {pages || 1}
			</p>
			<IconButton
				filled
				disabled={isLastPage}
				className={style.arrowRight}
				icon={ArrowDownIcon}
				onClick={() => setPage(page + 1)}
			/>
		</div>
	);
};

export default PageSelector;
