export function toKeyValueList(obj: {[key: string]: any}) {
	return Object.keys(obj).map(k => ({key: k, value: obj[k]}))
}