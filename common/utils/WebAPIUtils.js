import {
	// List,
	ChangemakerRecord,
	convertToRecordList
} from '../constants/Types';
import axios from 'axios';

export default {

	getAllChangemakers: function() {
		return axios('/api/changemaker').then(res => {
			return convertToRecordList(res.data, ChangemakerRecord);
		});
	}
};
