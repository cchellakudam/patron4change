import changemakers from './mockdata/changemakers.js';

// simulate network delay
const TIMEOUT = 100;

export default class {

	static getChangemakers( timeout = TIMEOUT ) {
		return new Promise( ( resolve /* , reject */ ) => {
			setTimeout(() => resolve(changemakers), timeout);
		})
	}

	static search( term, timeout = TIMEOUT ) {
		let normalizedTerm = term.toUpperCase();
		return new Promise( ( resolve /* , reject */ ) => {
			let matching = changemakers.filter(c => c.name.toUpperCase().includes(normalizedTerm));
			setTimeout(() => resolve(matching), timeout);
		})
	}
}
