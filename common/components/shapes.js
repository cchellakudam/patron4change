import { PropTypes } from 'react';

export const changemaker = PropTypes.shape({
  id: PropTypes.any.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  statusUpdates: PropTypes.arrayOf(PropTypes.string.isRequired),
  mission: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isBackedByMe: PropTypes.bool.isRequired
});
