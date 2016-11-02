import changemakers from './mockdata/changemakers.js';

// simulate network delay
const TIMEOUT = 100;

export default class {

	static getChangemakers( timeout = TIMEOUT ) {
		return new Promise( ( resolve /* , reject */ ) => {
			setTimeout(() => resolve(changemakers), timeout);
		})
	}
}
