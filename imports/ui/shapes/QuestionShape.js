import { PropTypes } from 'react';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  // userId: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
});
