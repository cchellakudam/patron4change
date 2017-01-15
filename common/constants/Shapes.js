import { PropTypes } from 'react';
import Immutable from 'immutable';
import * as Types from './Types';

function valueToType(val) {
  if ('string' === typeof val) {
    return PropTypes.string;
  }
  if ('number' === typeof val) {
    return PropTypes.number;
  }
  if (val instanceof Immutable.List) {
    // immutable lists are not arrays
    return PropTypes.object;
  }
  return PropTypes.any;
}

function recordToShape(record) {
  return Object.keys(record).reduce((ctx, next) => {
    ctx[next] = valueToType(record[next]).isRequired
    return ctx;
  }, {});
}

export const user = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
})

export const changemaker = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user
});

export const supporter = PropTypes.shape(recordToShape(Types._UserRecord));

export const children = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const immutableRecord = PropTypes.oneOfType([
  PropTypes.object.isRequired,
  PropTypes.array.isRequired
]).isRequired;

export const update = PropTypes.shape(recordToShape(Types._UpdateRecord));
