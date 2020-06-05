import React from 'react';
import { GameSessions } from './Components/GameSessions';

function App() {
	return (
		<div className="App">
			<header>
				<h1>Battlezone Session List</h1>
			</header>
			<GameSessions />
		</div>
	);
}

export default App;
