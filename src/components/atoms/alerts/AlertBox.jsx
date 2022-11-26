import { useEffect, useState } from 'react';

import { ALERT_KINDS } from '../../../constants/alertKinds';
import { alertBox } from '../../../lib/events/alertEvents';
import CheckCircle from '../icons/CheckCircleIcon';
import CrossCircle from '../icons/CrossCircleIcon';
import style from './AlertBox.module.css';

const ICONS = {
	[ALERT_KINDS.SUCCESS]: CheckCircle,
	[ALERT_KINDS.ERROR]: CrossCircle
};

const STYLES = {
	[ALERT_KINDS.SUCCESS]: style.success,
	[ALERT_KINDS.ERROR]: style.error
};

const AlertBox = () => {
	const alert = useAlert();
	if (!alert) return null;

	const Icon = ICONS[alert.kind];
	const className = STYLES[alert.kind];

	if (!Icon || !className) return null;

	return (
		<div className={`${style.wrapper} ${className}`}>
			<Icon className={style.icon} />
			<p className={style.message}>{alert.message}</p>
		</div>
	);
};
const useAlert = () => {
	const [alert, setAlert] = useState();

	useEffect(() => {
		if (!alert) return;
		const timeoutId = setTimeout(() => setAlert(), 3500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [alert]);

	useEffect(() => {
		const callback = alertData => setAlert(alertData);
		const handler = alertBox.subscribe(callback);
		return () => {
			alertBox.unsubscribe(handler);
		};
	}, []);

	return alert;
};

export default AlertBox;
