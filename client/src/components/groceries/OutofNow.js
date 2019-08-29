import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GroceriesHeader from './GroceriesHeader';
import GroceriesList from './GroceriesList';

import BoughtGroceriesList from './BoughtGroceriesList';
import { outOfNow } from '../../actions/groceryActions';

//Spinner css
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 45% auto;
`;

class OutofNow extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.outOfNow();
  }

  render() {
    const { groceries, loading } = this.props.grocery;

    let groceriesContent;

    if (groceries === null || loading) {
      groceriesContent = (
        <div>
          <BeatLoader
            css={override}
            sizeUnit={'px'}
            size={35}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      groceriesContent = (
        <div>
          <GroceriesHeader listName="Out of Now" />
          <div className="card-header header-color text-white">List</div>
          <GroceriesList groceryItems={groceries} />
          <br />
          <div className="card-header header-color text-white">Bought</div>
          <BoughtGroceriesList groceryItems={groceries} />
        </div>
      );
    }

    return (
      <div className="grocery">
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">{groceriesContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OutofNow.propTypes = {
  outOfNow: PropTypes.func.isRequired,
  grocery: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  grocery: state.grocery
});

export default connect(
  mapStateToProps,
  {
    outOfNow
  }
)(OutofNow);
