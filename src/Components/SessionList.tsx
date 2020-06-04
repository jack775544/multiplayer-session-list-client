import React from 'react';
import '../Style/session-list.css'
import { useFetch } from '../Util/useFetch';
import { SessionResponse } from '../Models/Session';
import { Collection } from '../Components/Collection';
import { toKeyValueList } from '../Util/toKeyValueList';

export function SessionList() {
	const { loading, error, data } = useFetch<SessionResponse>('https://localhost:6001/api/sessions?game=iondriver:raknetmaster2:bzcc');

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		console.error(error);
		return <div>Something went wrong contacting the server. Look at the console</div>;
	}

	if (data) {
		return (
			<Collection
				className="session-list"
				data={data.Sessions}
				columns={[
					{ title: 'Name', field: d => d.Name },
					{ title: 'Message', field: d => d.Message },
					{ title: 'Player Count', field: d => d.PlayerCount },
					{ title: 'Player Max', field: d => d.PlayerMax },
					{ title: 'Status', field: d => d.Status.State },
					{ title: 'Level', field: d => `${d.Level.GameMode} - ${d.Level.MapFile}` },
				]}
				expandList={gameData => {
					return (
						<div>
							<h3>Game Information</h3>
							<Collection
								data={toKeyValueList(gameData.Attributes).filter(d => typeof d.value !== 'object')}
								columns={[
									{title: 'Key', field: d => d.key},
									{title: 'Value', field: d => d.value},
								]}
							/>

							<h3>Players</h3>
							<Collection
								className="session-game"
								data={gameData.Players}
								columns={[
									{
										title: '', headerKey: 'image', field: d => (
											<a href={d.IDs.Steam?.ProfileUrl} target="_blank" rel="noopener noreferrer">
												<img src={d.IDs.Steam?.AvatarUrl} alt={d.IDs.Steam?.Nickname}
													 className="game-avatar"/>
											</a>
										)
									},
									{ title: 'Name', field: d => d.Name },
									{ title: 'Kills', field: d => d.Stats?.Kills },
									{ title: 'Score', field: d => d.Stats?.Score },
								]}
							/>
						</div>
					)
				}}
			/>
		);
	}

	return <></>;
}