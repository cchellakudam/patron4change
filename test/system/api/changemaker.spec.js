import axios from 'axios';
import { assert } from 'chai';

const service = axios.create({
  baseURL: 'http://localhost:3000/api/changemaker'
});

describe('/changemaker', () => {
	describe('/', ()=>{
		it('should return an array', (done) => {
			service('/')
			.then((res) => {
				assert.isArray(res.data);
				done();
			})
			.catch((err) => {
				done(err);
			})
		});
	});

	describe('/:changemakerId', () => {
		it('should return an object with id property', (done) => {
			service('/1')
			.then((res) => {
				assert.property(res.data, 'id');
				done();
			})
			.catch((err)=> {
				done(err);
			});
		});
	});

	describe('/featured', () => {
		it('should return an array', (done) => {
			service('/featured')
			.then((res) => {
				assert.isArray(res.data);
				done();
			})
			.catch((err)=> {
				done(err);
			})
		})
	})

});
