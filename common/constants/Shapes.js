import { PropTypes } from 'react';

export const user = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
})

export const changemaker = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user
});

export const supporter = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
});

export const children = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const update = PropTypes.shape({
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
  content: PropTypes.shape({
    text: PropTypes.string.isRequired
  })
});
