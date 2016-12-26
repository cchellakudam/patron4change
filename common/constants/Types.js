/* eslint no-undefined: 0 */
import Immutable from 'immutable';

export const ChangemakerRecord = Immutable.Record({
	id: undefined,
	name: '',
	avatarUrl: '',
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
})

export const ChangemakerUpdateRecord = Immutable.Record({
	id: '',
	title: ''
})

export const ChangemakerState = Immutable.Record({
	changemakers: Immutable.List(),
	changemaker: ChangemakerRecord()
})

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
