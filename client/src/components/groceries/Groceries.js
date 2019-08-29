import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GroceriesHeader from './GroceriesHeader';
import GroceriesForm from './GroceriesForm';
import GroceriesList from './GroceriesList';

import { getListName } from '../../actions/listActions';
import BoughtGroceriesList from './BoughtGroceriesList';
import { getGroceries } from '../../actions/groceryActions';
import { resetGroceries } from '../../actions/groceryActions';

//Css
import './Groceries.css';

//Spinner css
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 45% auto;
`;

class Groceries extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.getGroceries(this.props.match.params.id);

    this.props.getListName(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetGroceries(this.props.match.params.id);
  }

  render() {
    const { groceries, loading } = this.props.grocery;

    const { currentList } = this.props.list;

    let groceriesContent;

    if (currentList === null || groceries === null || loading) {
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
          <GroceriesHeader listName={currentList.text} />
          <GroceriesForm listId={this.props.match.params.id} />
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

Groceries.propTypes = {
  getGroceries: PropTypes.func.isRequired,
  getListName: PropTypes.func.isRequired,
  resetGroceries: PropTypes.func.isRequired,
  grocery: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  grocery: state.grocery,
  list: state.list
});

export default connect(
  mapStateToProps,
  { getGroceries, getListName, resetGroceries }
)(Groceries);
