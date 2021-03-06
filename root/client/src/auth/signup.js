import React from "react";
import { Field, reduxForm } from "redux-form";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { compose } from "redux";
import notRequireAuth from "./notRequireAuth.js";

import * as actions from "../actions";
import "bootstrap/dist/css/bootstrap.css";
import "./stlye.css";

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password has to be at least 8 characters";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className="form-control"
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Signup extends React.Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {});
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card">
        <h2>Please Signup</h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="firstname"
            type="text"
            component={renderField}
            label="First Name"
          />
          <Field
            name="lastname"
            type="text"
            component={renderField}
            label="Last Name"
          />
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
          <Field
            name="password"
            type="text"
            component={renderField}
            label="Password"
          />
          <div>
            <div>{this.props.errorMessage}</div>
            <br />
            <button className="btn btn-primary" type="submit">
              Signup!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const wrapper = notRequireAuth(Signup);

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signsup", validate })
)(wrapper);
