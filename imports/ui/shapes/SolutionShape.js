import { PropTypes } from 'react';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
});
