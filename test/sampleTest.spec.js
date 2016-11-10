var assert = require('chai').assert;

import React from 'react';
import { shallow } from 'enzyme';
import App from '../common/components/App'


// This is an example to showcase our testing frameworks

// all tests regarding Arrays are in this describe block
describe('Array', () => {
	// every test is a it method
	it('should initialize empty', () => {
		var arr = [];

		// chai assertion class imported above
		assert.equal(arr.length, 0);
	});
});

// testing react compontent with shallow rendering
describe('<App />', () => {
	it('Should render', () => {
		const wrapper = shallow(<App />)
		assert.equal(wrapper.find('div').length, 1)
	})
})


