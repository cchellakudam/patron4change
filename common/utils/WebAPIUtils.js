import 'isomorphic-fetch';
import {
	ChangemakerRecord,
	convertToRecordList
} from '../constants/Types';
import axios from 'axios';

function emptyRecordList() {
  return convertToRecordList([], ChangemakerRecord);
}

const searchBaseUrl = `http://localhost:3001`;

export default class {

	static getAllChangemakers() {
		return axios('/api/changemaker').then(res => {
			return convertToRecordList(res.data, ChangemakerRecord);
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve(emptyRecordList());
		}
    return axios(`${searchBaseUrl}/search/changemaker?q=${term}`).then(res => {
			let resultChangemakers = res.data.map(r => {
				let clone = Object.assign({}, r._source);
				// add random image
				clone.id = r._id;
				clone.image = [
					'https://randomuser.me/api/portraits/thumb/women/88.jpg',
					'https://randomuser.me/api/portraits/thumb/men/53.jpg',
					'https://randomuser.me/api/portraits/thumb/women/6.jpg',
					'https://randomuser.me/api/portraits/thumb/women/37.jpg',
					'https://randomuser.me/api/portraits/thumb/men/14.jpg'
				][Math.floor(Math.random() * 4.999999)];
				return clone;
			});
			return convertToRecordList(resultChangemakers, ChangemakerRecord);
		});
	}
}
