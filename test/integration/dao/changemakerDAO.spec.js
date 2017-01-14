import { expect } from 'chai';

import changemakerDAO from '../../../server/data/changemakerDAO';
import DBTestUtil from './DBTestUtil';

describe('changemakerDAO', () => {

	const exampleChangemakerId = 1;

	before(() => {
		return DBTestUtil.refreshDB();
	});

	describe('.getChangemakerById', () => {

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

		it('should return the specified result model', () => {

			return changemakerDAO.getChangemakerById(exampleChangemakerId).then(changemaker => {
				// TODO compare exactly with the values that have been inserted
        expect(changemaker).to.have.property('id', 1);
				expect(changemaker).to.have.deep.property('user.firstName', 'Matthias');
				expect(changemaker).to.have.deep.property('user.lastName', 'Holzer');
				expect(changemaker).to.have.deep.property('user.avatarUrl', 'https://randomuser.me/api/portraits/med/men/42.jpg');
				expect(changemaker).to.have.property('videoUrl', 'www.youtube.com');
			});
		});
	});

	describe('.getFeatured', () => {

		it('should return exactly 5 changemakers', () => {
			return changemakerDAO.getFeatured().then((changemakers) => {
        expect(changemakers).to.have.length(5);
			});
		});

		it('should prefer changemakers with more recent updates', () => {
			return changemakerDAO.getFeatured().then((changemakers) => {
				let higher = +new Date(changemakers[0].lastStatusUpdate);
				let lower = +new Date(changemakers[1].lastStatusUpdate);
        expect(higher).to.be.at.least(lower);
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
