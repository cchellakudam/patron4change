import { PropTypes } from 'react';

export const changemaker = PropTypes.shape({
  id: PropTypes.any.isRequired,
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  statusUpdates: PropTypes.arrayOf(PropTypes.string.isRequired),
  user: PropTypes.object,
  mission: PropTypes.shape({
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired
  }),
  avatarUrl: PropTypes.string.isRequired,
  isBackedByMe: PropTypes.bool.isRequired
});
