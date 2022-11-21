import { useReducer } from 'react';

const getInitialValue = () => {
	return {
		value: Math.floor(Math.random() * 10),
		step: 1,
		ticks: 0
	};
};

const App = () => {
	// const { value, step, ticks, dispatch } = useCounter();
	// Fixed initial state
	// const [{ value, step, ticks }, dispatch] = useReducer(counterReducer, {
	// 	value: 0,
	// 	step: 1,
	// 	ticks: 0
	// });
	const [{ value, step, ticks }, dispatch] = useReducer(
		counterReducer,
		null,
		getInitialValue
	);
	// const { value, step, ticks, increment, decrement, incrementStep, reset } =
	// 	useCounter();

	// const [value, setValue] = useState(0);
	// const [step, setStep] = useState(1);
	// const [ticks, setTicks] = useState(0);

	// const handleIncrement = () => {
	// 	setValue(value + step);
	// 	setTicks(ticks + 1);
	// };

	// const handleDecrement = () => {
	// 	setValue(value - step);
	// 	setTicks(ticks + 1);
	// };

	// const handleIncrementStep = () => {
	// 	setStep(step + 1);
	// };

	// const handleReset = () => {
	// 	setValue(0);
	// 	setStep(1);
	// 	setTicks(0);
	// };

	return (
		<div>
			<h1>{value}</h1>
			<h2>Step: {step}</h2>
			<h2>Ticks: {ticks}</h2>
			<div>
				<button onClick={() => dispatch({ type: 'increment' })}>
					Increment
				</button>
				<button onClick={() => dispatch({ type: 'decrement' })}>
					Decrement
				</button>
			</div>
			<div>
				<button onClick={() => dispatch({ type: 'incrementStep' })}>
					Increment step
				</button>
				<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
			</div>
		</div>
	);
};

const counterReducer = (counter, { type }) => {
	const { value, step, ticks } = counter;
	switch (type) {
		case 'increment':
			return {
				...counter,
				value: value + step,
				ticks: ticks + 1
			};
		case 'decrement':
			return {
				...counter,
				value: value - step,
				ticks: ticks + 1
			};
		case 'incrementStep':
			return {
				...counter,
				step: step + 1
			};
		case 'reset':
			return {
				...counter,
				value: 0,
				step: 1,
				ticks: 0
			};
		default:
			throw new Error('Invalid action');
	}
};

// const useCounter = () => {
// 	// Using useReducer
// 	const [counter, dispatch] = useReducer(counterReducer, {
// 		value: 0,
// 		step: 1,
// 		ticks: 0
// 	});

// 	return { ...counter, dispatch };

// INFO:  Using our custom reducer

// const [counter, setCounter] = useState({
// 	value: 0,
// 	step: 1,
// 	ticks: 0
// });

// const dispatch = action => {
// 	const newState = counterReducer(action);

// 	setCounter(newState);
// };

// To centralize the actions

// const increment = () => {
// 	const { value, step, ticks } = counter;
// 	setCounter({
// 		...counter,
// 		value: value + step,
// 		ticks: ticks + 1
// 	});
// };

// const decrement = () => {
// 	const { value, step, ticks } = counter;
// 	setCounter({
// 		...counter,
// 		value: value - step,
// 		ticks: ticks + 1
// 	});
// };

// const incrementStep = () => {
// 	const { step } = counter;
// 	setCounter({
// 		...counter,
// 		step: step + 1
// 	});
// };

// const reset = () =>
// 	setCounter({
// 		...counter,
// 		value: 0,
// 		step: 1,
// 		ticks: 0
// 	});

// return {
// 	...counter,
// 	increment,
// 	decrement,
// 	incrementStep,
// 	reset
// };

// Only with setters

// const setValue = value =>
// 	setCounter(prevCounter => ({ ...prevCounter, value }));
// const setStep = step => setCounter(prevCounter => ({ ...prevCounter, step }));
// const setTicks = ticks =>
// 	setCounter(prevCounter => ({ ...prevCounter, ticks }));

// return {
// 	...counter,
// 	setValue,
// 	setStep,
// 	setTicks
// };
// };

export default App;
