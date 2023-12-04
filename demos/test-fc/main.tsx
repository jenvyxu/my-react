import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	return (
		<div
			onClickCapture={(e) => {
				console.log('container');
				e.stopPropagation();
			}}
		>
			<div
				onClick={() => {
					setNum((val) => ++val);
					console.log(111);
				}}
			>
				{num}
			</div>
		</div>
	);
}

function Child() {
	return <p>hello world</p>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
