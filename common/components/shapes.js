import { PropTypes } from 'react';

export const changemaker = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isBackedByMe: PropTypes.bool.isRequired
}).isRequired;
