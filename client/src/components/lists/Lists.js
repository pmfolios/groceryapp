import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListsHeader from './ListsHeader';
import ListsForm from './ListsForm';
import ListsList from './ListsList';

import { getLists } from '../../actions/listActions';

//Css
import './Lists.css';

//Spinner css
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 45% auto;
`;

class Lists extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.getLists();
  }

  render() {
    const { lists, loading } = this.props.list;

    let listsContent;

    if (lists === null || loading) {
      listsContent = (
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
      listsContent = (
        <div>
          <ListsHeader componentName="Lists" />
          <ListsList listOfLists={lists} />
          <ListsForm />
        </div>
      );
    }

    return (
      <div className="lists">
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                {listsContent}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lists.propTypes = {
  getLists: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  list: state.list
});

export default connect(
  mapStateToProps,
  { getLists }
)(Lists);
