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
        expect(changemaker.lastStatusUpdate.getDate()).to.equal(new Date('2017-01-07T13:58:43.359Z').getDate());
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
