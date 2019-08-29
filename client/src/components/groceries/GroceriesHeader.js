import React from 'react';
import './GroceriesHeader.css';

export default props => {
  return (
    <div className="post-form mb-3">
      <div
        className="
      card 
      header-color
      "
      >
        <div
          className="
        card-header 
        text-white"
        >
          {props.listName}
        </div>
      </div>
    </div>
  );
};
