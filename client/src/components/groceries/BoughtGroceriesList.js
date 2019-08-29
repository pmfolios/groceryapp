import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './GroceryItem';

class BoughtGroceriesList extends Component {
  render() {
    const { groceryItems } = this.props;

    return groceryItems.map(item => {
      if (item.bought === true)
        return <GroceryItem key={item._id} item={item} />;
    });
  }
}

BoughtGroceriesList.propTypes = {
  groceryItems: PropTypes.array.isRequired
};

export default BoughtGroceriesList;
