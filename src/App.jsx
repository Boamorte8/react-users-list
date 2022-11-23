import { useEffect, useState } from 'react';

// const LS_KEY = 'count';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		document.title = `Counter ${counter}`;

		let meta = document.head.querySelector('meta[name="description"]');
		if (!meta) {
			meta = document.createElement('meta');
			meta.name = 'description';
			document.head.appendChild(meta);
		}
		meta.content = `Description with count: ${counter}`;
		// return () => {
		//   cleanup
		// };
	}, [counter]);

	const handleIncrement = () => {
		setCounter(counter + 1);
	};
	return (
		<>
			<h2>Counter - Value: {counter}</h2>
			<button onClick={handleIncrement}>Increment</button>
		</>
	);
};

const App = () => {
	// const [counter, setCounter] = useState(0);
	// Sync operation then you can do it on render
	// Number(localStorage.getItem(LS_KEY)) || 0

	// Another way to implement it for a sync operation
	// useEffect(() => {
	// 	localStorage.setItem(LS_KEY, counter);
	// }, [counter]);

	// With async operation
	// useEffect(() => {
	// 	fetch('').then((response) => response.json()).then(data => setCounter(data));
	// }, [counter]);

	// const handleIncrement = () => {
	// fetch('', { method: 'POST', body: counter.toString() }).then((response) => response.json()).then(data => setCounter(data));

	// setCounter(counter + 1);
	// A way to implement it for a sync operation
	// localStorage.setItem(LS_KEY, counter + 1);
	// };

	return (
		<>
			{/* <h2>Counter - Value: {counter}</h2>
			<button onClick={handleIncrement}>Increment</button> */}
			<Counter />
		</>
	);
};

export default App;
