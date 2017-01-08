import changemakerDAO from '../../../server/data/changemakerDAO';
import DBTestUtil from './DBTestUtil';
import { expect } from 'chai';

describe('changemakerDAO', () => {

	const exampleChangemakerId = 1;

	before(() => {
		return DBTestUtil.refreshDB();
	});

	describe('.getById', () => {

		it('should annotate a changemaker with the date of the last status update', () => {

			return changemakerDAO.getById(exampleChangemakerId).then((changemaker) => {
				let lastUpdateDay = new Date('2016-06-30T12:58:00.000Z').getDate();
        expect(changemaker.lastStatusUpdate.getDate()).to.equal(lastUpdateDay);
			});
		});

		it('should return the specified result model', () => {

			return changemakerDAO.getById(exampleChangemakerId).then(changemaker => {
        expect(changemaker).to.have.property('id', 1);
				expect(changemaker).to.have.deep.property('user.firstName', 'Matthias');
				expect(changemaker).to.have.deep.property('user.lastName', 'Holzer');
				expect(changemaker).to.have.deep.property('user.avatarUrl', 'https://randomuser.me/api/portraits/med/men/42.jpg');
				expect(changemaker).to.have.property('videoUrl', 'www.youtube.com');

				expect(changemaker).to.have.property('name', 'Matthias Holzer');
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

});
