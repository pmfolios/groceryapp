import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { deleteSingleItem } from '../../actions/groceryActions';
import { boughtSingleItem } from '../../actions/groceryActions';

import './GroceryItem.css';

class GroceryItem extends Component {
  onDeleteClick(id) {
    this.props.deleteSingleItem(id);
  }

  onBoughtClick(id) {
    this.props.boughtSingleItem(id);
  }

  render() {
    const { item } = this.props;

    return (
      <li
        className={classnames(
          'list-group-item d-flex justify-content-between align-items-center',
          {
            'list-group-item-secondary': item.bought
          }
        )}
      >
        <div className="pull-left">
          <input
            onClick={this.onBoughtClick.bind(this, item._id)}
            type="checkbox"
          />
        </div>
        <div className="center text-amount-unit">
          <span className="center font-weight-normal">{item.text}</span>
          <br />
          <div className="row justify-content-center">
            <span className="amount center text-muted">{item.amount}</span>{' '}
            <span className="unit center text-muted">{item.unit}</span>
          </div>
        </div>
        <div className="pull-right row">
          <div className="hover-btn">
            <button
              onClick={this.onDeleteClick.bind(this, item._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      </li>
    );
  }
}

GroceryItem.propTypes = {
  deleteSingleItem: PropTypes.func.isRequired,
  boughtSingleItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteSingleItem, boughtSingleItem }
)(GroceryItem);
