import React from 'react';
import './ListsHeader.css';

export default props => {
  return (
    <div className="post-form mb-3">
      <div className="card header-color">
        <div className="card-header text-white">{props.componentName}</div>
      </div>
    </div>
  );
};
