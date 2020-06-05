import React, { useState } from 'react';
import { classNames } from '../../Util/classNames';

export interface CollectionProps<T> {
	data: T[];
	columns: {
		title: string;
		headerKey?: string | number;
		field: (item: T) => React.ReactNode;
	}[];
	rowKey?: (item: T) => string | number;
	expandList?: (item: T) => React.ReactNode;
	className?: string;
}

export function Collection<T>({ className, columns, data, expandList, rowKey }: CollectionProps<T>) {
	const [expandedRows, setExpandedRows] = useState<(string | number)[]>([]);

	const toggleRow = (rowKey: string | number) => () => {
		const idx = expandedRows.indexOf(rowKey);

		if (idx === -1) {
			return setExpandedRows([...expandedRows, rowKey]);
		}

		expandedRows.splice(idx, 1)
		setExpandedRows([...expandedRows]);
	}

	return (
		<table className={classNames('pure-table', className)}>
			<thead>
			<tr>
				{columns.map(c => (
					<th key={c.headerKey ?? c.title}>{c.title}</th>
				))}
				{expandList ? <th key="expand"/> : undefined}
			</tr>
			</thead>
			<tbody>
			{data.map((d, i) => {
				const key = rowKey?.(d) ?? i;
				return (
					<React.Fragment key={key}>
						<tr>
							{
								columns.map((c, j) => (
									<td key={j}>{c.field(d)}</td>
								))
							}
							{expandList
								? <td>
									<button onClick={toggleRow(key)}>Expand</button>
								</td>
								: undefined}
						</tr>
						{expandList && expandedRows.indexOf(key) > -1
							? <tr>
								<td colSpan={columns.length + 1}>{expandList(d)}</td>
							</tr>
							: undefined}
					</React.Fragment>
				);
			})}
			</tbody>
		</table>
	);
}