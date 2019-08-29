import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SingleList.css';

class SingleList extends Component {
  onDeleteClick(id) {
    this.props.deleteSingleItem(id);
  }

  render() {
    const { list } = this.props;

    return (
      <Link to={`/groceries/${list._id}`} className="list-link">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {list.text}
          <div className="pull-right" />
        </li>
      </Link>
    );
  }
}

SingleList.propTypes = {
  list: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SingleList);
