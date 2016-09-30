// @flow

import React, { PropTypes } from 'react';
import type { Solution } from '../../shapes/SolutionShape';
import SolutionsList from './SolutionsList';
import SolutionForm from './SolutionForm';
import { LinkButton } from '../shared/Buttons';

type Props = {
  solutions: Solution[],
  onSolutionSubmit: (content: string) => void,
};

type DefaultProps = {
  onSolutionSubmit: (content: string) => void,
};

type State = {
  isShowingSolutions: boolean,
};

const defaultProps = {
  onSolutionSubmit: (content) => {},
};

export default class QuestionSolutions extends React.Component {
  static defaultProps: DefaultProps;
  props: Props;
  state: State;
  toggleSolutions: () => void;

  constructor(props: Props) {
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
        <LinkButton onClick={this.toggleSolutions}>
          Toggle Solutions
        </LinkButton>
        {isShowingSolutions && (
          <div>
            <hr />
            <SolutionsList solutions={solutions} />

            <p><strong>Submit a solution</strong></p>
            <SolutionForm onSubmit={onSolutionSubmit} />
          </div>
        )}
      </div>
    );
  }
}

QuestionSolutions.defaultProps = defaultProps;
