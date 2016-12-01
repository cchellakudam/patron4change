const {assert} = require('chai');

import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { render } from 'enzyme';
import { SearchResultContainer } from '../../../common/containers/SearchResultContainer'

// testing react compontent with shallow rendering
describe('<SearchResultContainer />', () => {

	it('should list all search results', () => {
		const changemaker = {
			id: 'lstanek',
			firstName: 'Lukas',
			lastName: 'Stanek',
			mission: 'Lukas Stanek\'s travels',
			image: '//img.png',
			isBackedByMe: false
		};
		const props = {
			results: Immutable.List([{ changemaker, relevance: 1, section: 'travel' }]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchResultContainer {...props} />)
		const searchResults = wrapper.find('.search-result-item');
		assert.equal(searchResults.length, 1);
	})
})
