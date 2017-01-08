/* eslint no-console: 0 */
import chai from 'chai';
import axios from 'axios';
import config from 'config';
const { expect } = chai;

const port = config.get('port');
const url = `http://localhost:${port}/api/changemakers`;

function msg(err) {
	if (err.Error) {
		return err.Error;
	}
	if (err.response) {
		return err.response.statusText || 'Unknown Error';
	}
	return 'Unknown Error';
}

describe('/changemakers', () => {

	it('should return at least 5 featured changemakers', () => {
		return axios.get(url + '/featured')
			.then((res) => {
				const results = res.data;
				expect(results).to.have.length.of.at.least(5);
			})
			.catch((err) => {
				console.log('test failure caught:', msg(err));
				expect.fail();
			});
	});
});
