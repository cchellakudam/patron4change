const {assert} = require('chai');

import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { render } from 'enzyme';
import { SearchContainer } from '../../../common/containers/SearchContainer'

// testing react compontent with shallow rendering
describe('<SearchContainer />', () => {

	it('should contain a search term element', () => {
		const props = {
			term: 'test & term',
			results: Immutable.List([]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchContainer {...props} />)
		const searchTerm = wrapper.find('#search-term');
		assert.equal(searchTerm.length, 1)
	})

	it('should set the stored term in the search term field', () => {
		const props = {
			term: 'test & term',
			results: Immutable.List([]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchContainer {...props} />)
		const searchTerm = wrapper.find('#search-term');
		assert.equal(searchTerm.attr('value'), 'test & term');
	})

	it('should list all search results', () => {
		const changemaker = {
			id: 'lstanek',
			name: 'Lukas Stanek',
			image: '//img.png',
			isBackedByMe: false
		}
		const props = {
			term: 'Lukas',
			results: Immutable.List([changemaker]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchContainer {...props} />)
		const searchResults = wrapper.find('.search-result-item');
		assert.equal(searchResults.length, 1);
	})
})
