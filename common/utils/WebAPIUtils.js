import 'isomorphic-fetch';
import {
	ChangemakerRecord,
	UpdateRecord,
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
			return convertToRecordList(res.data, UpdateRecord);
		});
	}

	static getFeaturedChangemakers(){
		return axios('/api/changemakers/featured').then(res => {
			return convertToRecordList(res.data,ChangemakerRecord);
		});
	}

	static saveChangemaker(data) {
		// TODO handle edit case
		return axios.post('/api/changemakers/', data).then(res => {
			return axios.get(res.headers.location);
		})
		.then(res => {
			return new ChangemakerRecord(res.data);
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

	static uploadVideo(file) {
		const fileData = new FormData();
		fileData.append('file', file, file.name);
		return axios.post('/api/media/', fileData, {
			params: {
				type: 'video'
			}
		}).then(res => {
			return res.data;
		});
	}
}
