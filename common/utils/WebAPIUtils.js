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
		return axios('/api/changemakers').then(res => {
			return convertToRecordList(res.data, ChangemakerRecord);
		});
	}

	static getChangemakerById(id) {
		return axios(`/api/changemakers/${id}`).then(res => {
			return new ChangemakerRecord(res.data);
		});
	}

	static getAllUpdatesByUserId(id) {
		return axios('/api/changemakers/' + id + '/updates').then(res => {
			return convertToRecordList(res.data, ChangemakerUpdateRecord);
		});
	}

	static getFeaturedChangemakers(){
		return axios('/api/changemakers/featured').then(res => {
			return convertToRecordList(res.data,ChangemakerRecord);
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve(emptyRecordList());
		}
    return axios(`/api/search?q=${term}`).then(res => {
			return convertToRecordList(res.data, SearchResultRecord);
		});
	}
}
