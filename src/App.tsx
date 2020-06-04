import React from 'react';
import './App.css';
import { SessionList } from './Components/SessionList';

function App() {
	return (
		<div className="App">
			<header>
				<h1>Battlezone Session List</h1>
			</header>
			<SessionList />
		</div>
	);
}

export default App;
