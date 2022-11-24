import { useEffect, useState } from 'react';

const Listener = () => {
	const [message, setMessage] = useState();

	useEffect(() => {
		const handleMessage = ev => {
			setMessage(ev.detail.message);
		};

		document.addEventListener('showMessage', handleMessage);
		return () => document.removeEventListener('showMessage', handleMessage);
	}, []);

	return <h1>{message || 'Waiting message...'}</h1>;
};

const Emitter = () => {
	// detail is not optional name, javascript not allow other name prop
	return (
		<button
			onClick={() => {
				const event = new CustomEvent('showMessage', {
					detail: { message: Math.random() }
				});

				document.dispatchEvent(event);
			}}
		>
			Emit
		</button>
	);
};

const App = () => {
	return (
		<>
			<Listener />
			<Emitter />
		</>
	);
};

export default App;
