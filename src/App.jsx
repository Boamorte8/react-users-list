import { useEffect, useState } from 'react';

const getNewValue = () =>
	new Promise(resolve => {
		setTimeout(() => {
			const random = Math.floor(Math.random() * 10);
			resolve(random);
		}, 5000);
	});
// const getInitialValue = () =>
// 	new Promise(resolve => {
// 		setTimeout(() => {
// 			const random = Math.floor(Math.random() * 10);
// 			resolve(random);
// 		}, 5000);
// 	});

const setInitialValue = async setCount => {
	const initialValue = await getNewValue();
	// const initialValue = await getInitialValue();
	setCount(initialValue);
};

// const fetchData = async () => {
// 	await
// }

// const setTitle = count => {
// 	document.title = count;
// };

const App = () => {
	const [count, setCount] = useState();
	// const [play, setPlay] = useState(true);

	useEffect(() => {
		setInitialValue(setCount);
	}, []);

	if (count === undefined) return <p>Loading...</p>;

	// useEffect(() => {
	// 	if (!play) return;

	// 	const intervalId = setInterval(() => {
	// 		setCount(prevCount => prevCount - 1);
	// 	}, 1000);

	// 	return () => clearInterval(intervalId);
	// }, [play]);

	return (
		<div>
			<h1>{count}</h1>
			<button
				onClick={async () => {
					const newValue = await getNewValue();
					setCount(newValue);
				}}
			>
				Random
			</button>
			{/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
			{/* <button
				onClick={() => {
					setPlay(!play);
				}}
			>
				{play ? 'Pause' : 'Play'}
			</button> */}
			{/* <h2>Step: {step}</h2>
			<button
				onClick={() => {
					setCount(count + step);
				}}
			>
				Increment counter +{step}
			</button>
			<button
				onClick={() => {
					setStep(step + 1);
				}}
			>
				Increment step +1
			</button> */}
			{/* <button
				onClick={() => {
					setCount(count + 2);
				}}
			>
				Increment +2
			</button>
			<button
				onClick={() => {
					setCount(count + 3);
				}}
			>
				Increment +3
			</button> */}
		</div>
	);
};
/* <User
				name='Pablo Castellanos'
				active='Active'
				onClick={() => console.log('Click')}
			/>
			<User name='Jose Miguel Fernández' active='Active' />
			<User name='Esteban Salazar' active='Active' role='Student' /> */
/* </UsersList> */

export default App;
