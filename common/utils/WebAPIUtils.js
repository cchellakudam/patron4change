import p4cApi from '../api';
import 'isomorphic-fetch';

import {
	// List,
	ChangemakerRecord,
	convertToRecordList
} from '../constants/Types';
import axios from 'axios';

export default class {

	static getAllChangemakers() {
		return axios('/api/changemaker').then(res => {
			return convertToRecordList(res.data, ChangemakerRecord);
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve(convertToRecordList([], ChangemakerRecord));
		}

		return p4cApi.search(term).then(result => {
			return convertToRecordList(result, ChangemakerRecord);
		});
	}
}
