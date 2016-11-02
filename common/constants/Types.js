import Immutable from 'immutable';

export const ChangemakerState = Immutable.Record({
	changemakers: Immutable.List()
})

export const ChangemakerRecord = Immutable.Record({
	id: '',
	image: '',
	name: '',
	isBackedByMe: false
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
