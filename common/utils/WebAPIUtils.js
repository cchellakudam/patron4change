import 'isomorphic-fetch';
import {
	ChangemakerRecord,
	ChangemakerUpdateRecord,
	SearchResultRecord,
	convertToRecordList
} from '../constants/Types';
import axios from 'axios';

function emptyRecordList() {
  return convertToRecordList([], ChangemakerRecord);
}

export default class {

	static getAllChangemakers() {
		return axios('/api/changemaker').then(res => {
			return convertToRecordList(res.data, ChangemakerRecord);
		});
	}

	static getAllUpdatesByUserId(id) {
		return axios('/api/changemaker/' + id + '/updates').then(res => {
			return convertToRecordList(res.data, ChangemakerUpdateRecord);
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve(emptyRecordList());
		}
    return axios(`/api/search?q=${term}`).then(res => {
			let results = res.data.map(result => {
				result.changemaker.image = [
					'https://randomuser.me/api/portraits/thumb/women/88.jpg',
					'https://randomuser.me/api/portraits/thumb/men/53.jpg',
					'https://randomuser.me/api/portraits/thumb/women/6.jpg',
					'https://randomuser.me/api/portraits/thumb/women/37.jpg',
					'https://randomuser.me/api/portraits/thumb/men/14.jpg'
				][Math.floor(Math.random() * 4.999999)];
				return result;
			});
			return convertToRecordList(results, SearchResultRecord);
		});
	}
}
