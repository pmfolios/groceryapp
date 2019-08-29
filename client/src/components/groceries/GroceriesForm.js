import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addSingleItem } from '../../actions/groceryActions';
import './GroceriesForm.css';

class GroceriesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      amount: 1,
      unit: 'item',
      listId: this.props.listId,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      text: this.state.text,
      amount: this.state.amount,
      unit: this.state.unit,
      listId: this.state.listId
    };

    this.props.addSingleItem(newItem);
    this.setState({
      text: '',
      amount: 1,
      unit: 'item'
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header header-color text-white">
            Add an Item!
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Add item"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                {/* Amount */}
                <label>
                  Amount:{' '}
                  <select
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </label>
                {/* Unit */}
                <label>
                  Unit:{' '}
                  <select
                    name="unit"
                    value={this.state.unit}
                    onChange={this.onChange}
                  >
                    <option value="item">item</option>
                    <option value="gallon">gallon</option>
                    <option value="liter">liter</option>
                    <option value="oz">oz</option>
                    <option value="can">can</option>
                    <option value="box">box</option>
                    <option value="bag">bag</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

GroceriesForm.propTypes = {
  addSingleItem: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addSingleItem }
)(GroceriesForm);
