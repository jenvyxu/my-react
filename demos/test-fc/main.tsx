import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	const arr =
		num % 2 === 0
			? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];

	return (
		<ul
			onClickCapture={() => {
				setNum((num) => num + 1);
				setNum((num) => num + 1);
				setNum((num) => num + 1);
			}}
		>
			<>
				<li>1</li>
				<li>2</li>
			</>
			{arr}
		</ul>
	);
}

function Child() {
	return <p>hello world</p>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
