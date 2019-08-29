import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

//Css
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('lists');
    }
  }

  render() {
    return (
      <div className="app-landing text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">SmartList</h1>
              <p className="lead">
                A Grocery App: Never worry about what you're out of again!
              </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-light mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
