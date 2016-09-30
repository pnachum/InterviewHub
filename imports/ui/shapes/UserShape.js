import { PropTypes } from 'react';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  emails: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired,
  })),
});
