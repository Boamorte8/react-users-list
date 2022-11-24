import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Child = () => {
	const [portal, setPortal] = useState(null);

	useEffect(() => {
		setPortal(
			createPortal(<h1>This is a portal</h1>, document.getElementById('portal'))
		);
	}, []);

	return portal;

	// This will not work properly
	// return createPortal(
	// 	<h1>This is a portal</h1>,
	// 	document.getElementById('portal')
	// );
};

const HeadPortal = () =>
	createPortal(
		<>
			<title>Boamorte</title>
			<meta name='description' content='Boamorte page'></meta>
		</>,
		document.head
	);

const PortalA = () =>
	createPortal(<h1>Portal A</h1>, document.getElementById('portal'));

const PortalB = () =>
	createPortal(<h1>Portal B</h1>, document.getElementById('portal'));

const PortalC = () => {
	return createPortal(
		<button>Portal C</button>,
		document.getElementById('portal')
	);
};

const App = () => {
	const [showA, setShowA] = useState(true);
	const [showB, setShowB] = useState(true);
	return (
		<>
			<HeadPortal />
			{showA && <PortalA />}
			{showB && <PortalB />}
			<button onClick={() => setShowA(!showA)}>Show/Hide A</button>
			<button onClick={() => setShowB(!showB)}>Show/Hide B</button>

			<div onClick={() => console.log('Click on div')}>
				<PortalC />
			</div>

			{/* <h1>This is my App</h1>
			<div id='portal'></div> */}
			<Child />
		</>
	);
};

export default App;
