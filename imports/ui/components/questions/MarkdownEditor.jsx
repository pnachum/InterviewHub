// @flow

import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';

type Props = {
  value: string,
  onChange: (e: Event) => void,
  onBlur: (e: Event) => void,
};

export default function MarkdownEditor({ value, onChange, onBlur }: Props) {
  return (
    <div>
      <div className="col-lg-6">
        <textarea
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          cols={100}
          rows={10}
          placeholder="Markdown available"
        />
      </div>

      <div className="col-lg-6">
        <Markdown source={value} />
      </div>
    </div>
  );
}
