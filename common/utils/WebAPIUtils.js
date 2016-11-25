import p4cApi from '../api';
import 'isomorphic-fetch';
import {
	// List,
	ChangemakerRecord,
	convertToRecordList
} from '../constants/Types';

export default class {

	static getAllChangemakers() {
		return p4cApi.getChangemakers().then(result => {
			return convertToRecordList(result, ChangemakerRecord)
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
