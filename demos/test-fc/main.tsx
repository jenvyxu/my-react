import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return (
		<div>
			{/* <Child /> */}
			{num}
		</div>
	);
}

function Child() {
	return <span>hello world</span>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
