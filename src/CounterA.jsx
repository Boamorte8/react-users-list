import { useCounter } from './useCounter';

const CounterA = () => {
	const { counter, setCounter } = useCounter();

	return (
		<div>
			<h2>Counter A - Value: {counter}</h2>
			<button onClick={() => setCounter(counter + 1)}>Increment</button>
			<button onClick={() => setCounter(counter - 1)}>Decrement</button>
		</div>
	);
};

export default CounterA;
