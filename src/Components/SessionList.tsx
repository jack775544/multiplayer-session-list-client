﻿import React from 'react';
import '../Style/session-list.css'
import { useFetch } from '../Util/useFetch';
import { Session, SessionResponse } from '../Models/Session';
import { toKeyValueList } from '../Util/toKeyValueList';
import { Collection } from './Generic/Collection';

export interface SessionListProps {
	gameId?: string;
}
//
export function SessionList(props: SessionListProps) {
	const url = props.gameId
		? `https://localhost:6001/api/sessions?game=${props.gameId}`
		: '';
		
	const { loading, error, data } = useFetch<SessionResponse>(url);
	
	if (!props.gameId) {
		return <div>Please select a game</div>;
	}

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
				expandList={sessionData => <SessionData sessionData={sessionData}/>}
			/>
		);
	}

	return <></>;
}

export function SessionData({ sessionData }: { sessionData: Session }) {
	return (
		<div>
			<h3>Game Information</h3>
			<Collection
				data={toKeyValueList(sessionData.Attributes).filter(d => typeof d.value !== 'object')}
				columns={[
					{ title: 'Key', field: d => d.key },
					{ title: 'Value', field: d => d.value },
				]}
			/>

			<h3>Players</h3>
			<Collection
				className="session-game"
				data={sessionData.Players}
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
}