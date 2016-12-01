import { expect } from 'chai';

import SearchReducer from '../../../common/reducers/SearchReducer';
import ActionTypes from '../../../common/constants/ActionTypes';
import { SearchState } from '../../../common/constants/Types';

describe('SearchReducer', () => {

  it('should return the initial state', () => {
    const state = SearchReducer(undefined, {});
    expect(state.term).to.equal('');
    expect(state.results.isEmpty()).to.be.true;
  })

  it('should set a new search term on search request', () => {
    const stateObj = new SearchState();
    const state = SearchReducer(stateObj, {
      type: ActionTypes.GLOBAL_SEARCH_REQUEST,
      term: 'new term'
    });
    expect(state.term).to.equal('new term');
  })
});
