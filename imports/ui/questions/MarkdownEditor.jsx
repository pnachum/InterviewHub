import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div>
      <div className="col-lg-6">
        <textarea
          value={value}
          onChange={onChange}
          cols={100}
          rows={10}
        />
      </div>

      <div className="col-lg-6">
        <Markdown source={value} />
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = propTypes;
