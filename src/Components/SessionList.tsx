import React from 'react';
import { useFetch } from '../Util/useFetch';
import { SessionResponse } from '../Models/Session';
import { Collection } from '../Components/Collection';

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
				data={data.Sessions}
				columns={[
					{ title: 'Name', field: d => d.Name },
					{ title: 'Player Count', field: d => d.PlayerCount },
					{ title: 'Player Max', field: d => d.PlayerMax },
					{ title: 'Status', field: d => d.Status.State },
					{ title: 'Level', field: d => `${d.Level.GameMode} - ${d.Level.MapFile}` },
				]}
				expandList={playerData => {
					return (
						<Collection
							data={playerData.Players}
							columns={[
								{ title: '', headerKey: 'image', field: d => (
									<a href={d.IDs.Steam?.ProfileUrl} target="_blank" rel="noopener noreferrer">
										<img src={d.IDs.Steam?.AvatarUrl} alt={d.IDs.Steam?.Nickname}/>
									</a>
								) },
								{ title: 'Name', field: d => d.Name },
								{ title: 'Kills', field: d => d.Stats?.Kills },
								{ title: 'Score', field: d => d.Stats?.Score },
							]}
						/>
					)
				}}
			/>
		);
	}

	return <></>;
}