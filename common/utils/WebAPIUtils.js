import p4cApi from '../api';
import {
	// List,
	ChangemakerRecord,
	convertToRecordList
} from '../constants/Types';

export default {

	getAllChangemakers: function() {
		return p4cApi.getChangemakers().then(result => {
			return convertToRecordList(result, ChangemakerRecord)
		});
	}
};
