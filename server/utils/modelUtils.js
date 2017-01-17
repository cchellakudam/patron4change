
export function extractProps(raw, prefix) {
	return Object.keys(raw).reduce((ctx, next) => {
		if (next.startsWith(prefix)) {
			let prop = next.split('.')[1];
			let keyInRaw = prefix + '.' + prop;
			ctx[prop] = raw[keyInRaw];
			delete raw[keyInRaw];
		}
		return ctx;
	}, {});
}
