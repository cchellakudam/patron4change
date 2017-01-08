import { expect } from 'chai';

import ChangemakerReducer from '../../../common/reducers/ChangemakerReducer';
import ActionTypes from '../../../common/constants/ActionTypes';
import { ChangemakerState } from '../../../common/constants/Types';

describe('ChangemakerReducer', () => {

  it('should return the initial state', () => {
    const stateObj = new ChangemakerState();
    const state = ChangemakerReducer(stateObj, {});
    expect(state.changemakers.toJS()).to.be.empty;
    expect(state.featuredChangemakers.toJS()).to.be.empty;
  })

  it('should set featured changemakers, and merge the new changemakers into the list', () => {
    const stateObj = new ChangemakerState();

    const matthias = {
      id: 2,
      name: 'Matthias Holzer'
    };

    const state = ChangemakerReducer(stateObj, {
      type: ActionTypes.GET_FEATURED_CHANGEMAKERS_SUCCESS,
      result: [
        matthias
      ]
    });
    expect(state.changemakers.toJS()[0]).to.deep.equal(matthias);
    expect(state.featuredChangemakers.toJS()[0]).to.equal(2);
  })
});
