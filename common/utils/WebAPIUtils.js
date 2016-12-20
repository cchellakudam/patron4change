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

	static getFeaturedChangemakers(){
		return axios('/api/changemaker/featured').then(res => {
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
