import React, { useState } from 'react';
import { useFetch } from '../Util/useFetch';
import { Game } from '../Models/Game';
import { SessionList } from './SessionList';
import { Dropdown } from './Generic/Dropdown';

export function GameSessions() {
	const [game, setGame] = useState('');
	const { loading, error, data } = useFetch<Game[]>('https://localhost:6001/api/games');
	
	if (loading) {
		return <div>Loading</div>;
	}
	
	if (error) {
		console.error(error);
		return <div>{JSON.stringify(error)}</div>;
	}
	
	if (data) {
		return (
			<>
				<Dropdown 
					value={game}
					updateValue={setGame}
					options={data.map(x => ({key: x.Key, value: x.Name}))}
				/>
				<SessionList gameId={game} />
			</>
		)
	}
	
	return <></>;
}