/* eslint no-console: 0 */
import chai from 'chai';
import axios from 'axios';
import config from 'config';
const { expect } = chai;

const port = config.get('port');
const url = `http://localhost:${port}/api/users`;

describe('/user', () => {

	describe('/login', () => {
		function req(email){
			return axios({
				url: `${url}/login`,
				method: 'post',
				data: {email: email}
			})
		}

		it('should return the user that is logged in', () => {
			return req('matthias.holzer@example.com')
				.then((res) => {
					expect(res.data.email).to.equal('matthias.holzer@example.com')
					expect(res.data.firstName).to.equal('Matthias')
					expect(res.data.lastName).to.equal('Holzer')
					expect(res.data.id).to.equal(1)
				});
		});

		it('should return the a new user that just registered', () => {
			return req('rebecca.keuler@example.com')
				.then((res) => {
					expect(res.data.email).to.equal('rebecca.keuler@example.com')
					expect(res.data.firstName).to.equal(null)
					expect(res.data.lastName).to.equal(null)
				});
		});

	});
});
