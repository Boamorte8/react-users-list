import { createRoot } from 'react-dom/client';

import './index.css';

const course = 'React';

const content = (
	<>
		<h2 style={{ color: 'blue', fontSize: '1.5rem' }}>Content</h2>
		<p>Here you can find all the content of the course</p>
		<form>
			<label htmlFor='text'>Text</label>
			<input type='text' id='text' defaultValue='Default' />
		</form>
	</>
);

const app = (
	<div>
		<h1 className='title' style={{}}>
			{course} Course
		</h1>
		<p>Welcome to {course} course</p>
		<p>This course have 25 sections</p>
		<div>{content}</div>
		<button onClick={() => alert('Access')}>Access</button>
	</div>
);
const container = document.getElementById('root');

// This is the way of React 17
// ReactDOM.render(app, container);

const root = createRoot(container);
root.render(app);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
