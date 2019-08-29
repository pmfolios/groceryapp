import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleList from './SingleList';

class ListsList extends Component {
  render() {
    const { listOfLists } = this.props;

    return listOfLists.map(list => <SingleList key={list._id} list={list} />);
  }
}

ListsList.propTypes = {
  listOfLists: PropTypes.array.isRequired
};

export default ListsList;
