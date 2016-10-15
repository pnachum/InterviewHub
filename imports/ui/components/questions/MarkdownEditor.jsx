// @flow

import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';

type Props = {
  value: string,
  onChange: (e: Event) => void,
  onBlur?: (e: Event) => void,
};

const styles = {
  textarea: {
    width: '100%',
  },
};

export default function MarkdownEditor({ value, onChange, onBlur }: Props) {
  return (
    <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
        <textarea
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={10}
          placeholder="Markdown available"
          autoFocus
          style={styles.textarea}
        />
      </div>

      <div className="col-sm-6 col-md-6 col-lg-6">
        <Markdown source={value} />
      </div>
    </div>
  );
}
