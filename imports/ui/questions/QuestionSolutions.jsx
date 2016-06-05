import React, { PropTypes } from 'react';
import SolutionShape from '../shapes/SolutionShape';
import SolutionsList from './SolutionsList';
import SolutionForm from './SolutionForm';

const propTypes = {
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  onSolutionSubmit: PropTypes.func,
};

const defaultProps = {
  onSolutionSubmit: () => {},
};

export default class QuestionSolutions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingSolutions: false,
    };

    this.toggleSolutions = this.toggleSolutions.bind(this);
  }

  toggleSolutions() {
    this.setState({
      isShowingSolutions: !this.state.isShowingSolutions,
    });
  }

  render() {
    const { solutions, onSolutionSubmit } = this.props;
    const { isShowingSolutions } = this.state;
    return (
      <div>
        <a href="#" onClick={this.toggleSolutions}>Toggle Solutions</a>
        {isShowingSolutions && (
          <div>
            <SolutionsList solutions={solutions} />

            <p><strong>Submit a solution</strong></p>
            <SolutionForm onSubmit={onSolutionSubmit} />
          </div>
        )}
      </div>
    );
  }
}

QuestionSolutions.propTypes = propTypes;
QuestionSolutions.defaultProps = defaultProps;
