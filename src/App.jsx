import { forwardRef, useImperativeHandle, useRef } from 'react';

// let count = 0;

// const Counter = ({ name }) => {
// 	// const [count, setCount] = useState(0);
// 	let countRef = useRef(0);

// 	console.log('Render', name);
// 	const handleClick = () => {
// 		// setCount(count + 1);
// 		// console.log(count + 1);
// 		countRef.current += 1;

// 		// count++;
// 		console.log(name, countRef.current);
// 		// console.log(name, count, countRef.current);
// 	};
// 	return <button onClick={handleClick}>Count {name}</button>;
// };

const CustomInput = forwardRef((_, ref) => {
	const inputRef = useRef(null);
	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				console.log('Focus');
				inputRef.current.focus();
			}
		}),
		[]
	);
	return <input type='text' ref={inputRef} />;
	// return <input type='text' ref={ref} />;
});

const App = () => {
	const inputRef = useRef(null);
	return (
		<>
			<CustomInput ref={inputRef} />
			<button onClick={() => inputRef.current.focus()}>focus</button>
			{/* <Counter name='A' />
		<Counter name='B' /> */}
			{/* <CounterA />
		<CounterB /> */}
		</>
	);
};

export default App;
