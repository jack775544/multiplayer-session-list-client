import { useEffect, useState } from 'react';

export function useFetch<T = any, E = any>(input: RequestInfo, init?: RequestInit) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<E>();
	const [data, setData] = useState<T>();

	useEffect(() => {
		if (input === '') {
			return;
		}

		fetch(input, init)
			.then(r => r.json())
			.then(d => {
				setLoading(false);
				setData(d);
			})
			.catch(e => {
				setLoading(false);
				setError(e);
			});
	}, [input, init]);

	return { loading, error, data };
}