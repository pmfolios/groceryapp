import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './GroceryItem';

class GroceriesList extends Component {
  render() {
    const { groceryItems } = this.props;

    return groceryItems.map(item => {
      if (item.bought === false)
        return <GroceryItem key={item._id} item={item} />;
    });
  }
}

GroceriesList.propTypes = {
  groceryItems: PropTypes.array.isRequired
};

export default GroceriesList;
