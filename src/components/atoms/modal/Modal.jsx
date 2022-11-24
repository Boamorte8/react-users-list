import { createPortal } from 'react-dom';

import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './Modal.module.css';

const Modal = ({ onClose, children }) => {
	if (!children) return null;
	return createPortal(
		<div className={style.overlay}>
			<div className={style.modal}>
				<IconButton
					type='button'
					filled
					className={style.close}
					icon={CrossIcon}
					onClick={onClose}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
