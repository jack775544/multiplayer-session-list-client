import React from 'react';

export interface DropdownProps {
	options: {key: string, value: string}[];
	value: string;
	updateValue: (value: string) => void;
}

export function Dropdown(props: DropdownProps) {
	return (
		<select value={props.value} onChange={event => props.updateValue(event.target.value)}>
			{
				props.options.map(o => (
					<option key={o.key} value={o.key}>{o.value}</option>
				))
			}
		</select>
	);
}