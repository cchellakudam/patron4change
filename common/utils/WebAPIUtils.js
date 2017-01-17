import 'isomorphic-fetch';
import axios from 'axios';

export default class {

	static getAllChangemakers() {
		return axios('/api/changemakers').then(res => {
			return res.data;
		});
	}

	static getChangemakerById(id) {
		return axios(`/api/changemakers/${id}`).then(res => {
			return res.data;
		});
	}

	static getAllUpdatesByUserId(id) {
		return axios('/api/changemakers/' + id + '/updates').then(res => {
			return res.data;
		});
	}

	static getFeaturedChangemakers(){
		return axios('/api/changemakers/featured').then(res => {
			return res.data;
		});
	}

	static getBackingsByChangemakerId(id) {
		return axios('/api/changemakers/' + id + '/backings').then(res => {
			return res.data;
		});
	}

	static saveChangemaker(data) {
		// TODO handle edit case
		return axios.post('/api/changemakers/', data).then(res => {
			return axios.get(res.headers.location);
		})
		.then(res => {
			return res.data;
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve([]);
		}
    return axios(`/api/search?q=${term}`).then(res => {
			return res.data;
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
