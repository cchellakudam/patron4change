import { expect } from 'chai';

import changemakerDAO from '../../../server/data/changemakerDAO'
import DBTestUtil from './DBTestUtil'

describe('changemakerDAO', () => {

	before( () => {
		return DBTestUtil.refreshDB();
	});

	describe('getChangemakerById', () => {

		it('should find and return an existing changemaker', done => {
			changemakerDAO.getChangemakerById(1).then( changemaker => {
				expect(changemaker).to.have.property('id', 1);
				done();
			});
		});

		it('should return status updates for an existing changemaker', done => {
			changemakerDAO.getChangemakerById(1).then( changemaker => {
				expect(changemaker).to.have.deep.property('statusUpdates[0].content.text');
				done();
			});
		});

	});

	describe('createChangemaker', () => {

		it('should create a changemaker', done => {
			const testData = {
				mission: {
					text: 'Test mission'
				}
			};
			changemakerDAO.createChangemaker(testData).then( id => {
				return changemakerDAO.getChangemakerById(id);
			})
			.then( changemaker => {
				expect(changemaker).to.have.deep.property('mission.text', testData.mission.text);
				done();
			});
		});

	});
});
