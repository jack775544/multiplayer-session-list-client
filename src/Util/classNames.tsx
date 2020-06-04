export function classNames (...names: (string | number | null | undefined)[]) {
	return names.filter(n => n !== null && n !== undefined).join(' ');
}