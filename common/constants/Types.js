/* eslint no-undefined: 0 */
import Immutable from 'immutable';

export const AppState = Immutable.Record({
	// id of the user that is authenticated, or null if not authenticated
	userId: null
})

export const _ChangemakerRecord = {
	id: undefined,
	name: '',
	avatarUrl: '',
	videoUrl: '',
	statusUpdates: Immutable.List(),
	mission: Immutable.Record({
		id: '',
		text: ''
	}),
	user: Immutable.Record({
		id: '',
		firstName: '',
		lastName: '',
		avatarUrl: ''
	})
}

export const ChangemakerRecord = Immutable.Record(_ChangemakerRecord)

export const ChangemakerState = Immutable.Record({
	changemakers: Immutable.List(),
	// list of ids of the changemakers featured on the start page
	featuredChangemakers: Immutable.List(),
	changemaker: ChangemakerRecord(),
	videoUrl: '' // TODO remove this and use an asynchronous server-side workflow
})

export const _UpdateRecord = {
	title: '',
	createdAt: '',
	content: Immutable.Record({
		text: ''
	})
}

export const UpdateRecord = Immutable.Record(_UpdateRecord)

export const SearchState = Immutable.Record({
	term: '',
	results: Immutable.List()
})

export const SearchResultRecord = Immutable.Record({
	match: undefined,
	changemaker: undefined
})

export function convertToRecordMap( arr, Def ){
	return arr.reduce( (acc, item) => acc.set( item.id, new Def(item) ), Immutable.Map() );
}

export function convertToRecordList( arr, Def ){
	return Immutable.List(arr.map(item => new Def(item)));
}

export function convertMapToImmutable( map, Def ){
	return Object.keys(map)
		.reduce( (acc, key) => {
			let item = map[key];
			return acc.set( item.id, new Def(item) );
		}, Immutable.Map() );
}
