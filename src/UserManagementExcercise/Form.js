import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { addUser, updateUser } from "../redux/action/action";

class Form extends Component {
  state = {
    values: {
      username: "",
      fullName: "",
      password: "",
      email: "",
      phoneNumber: "",
      userType: "Regular customer",
    },

    error: {
      username: "",
      fullName: "",
      password: "",
      email: "",
      phoneNumber: "",
      userType: "",
    },
  };

  handleChangeValue = (event) => {
    let { name, value, type } = event.target;
    let newValue = { ...this.state.values, [name]: value };
    let newError = { ...this.state.error };
    let convertName = name.replace(/([A-Z])/g, " $1");
    let normalName = convertName.charAt(0).toUpperCase() + convertName.slice(1);
    if (value.trim() === "") {
      newError[name] = normalName + " is required !";
    } else {
      newError[name] = "";
    }

    if (name === "username") {
      const regexUsername = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
      if (!regexUsername.test(value)) {
        newError[name] = normalName + " invalid";
      } else {
        newError[name] = "";
      }
    }

    if (type === "email") {
      const regexEmail =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regexEmail.test(value)) {
        newError[name] = normalName + " is invalid !";
      } else {
        newError[name] = "";
      }
    }

    if (name === "password") {
      const regexPassword =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!regexPassword.test(value)) {
        newError[name] =
          normalName +
          " has to have minimum eight characters, at least one letter, one number and one special character";
      } else {
        newError[name] = "";
      }
    }
    if (name === "phoneNumber") {
      const regexPhone =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      if (!regexPhone.test(value)) {
        newError[name] = "Plese enter valid phone number";
      } else {
        newError[name] = "";
      }
    }
    this.setState({
      values: newValue,
      error: newError,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container form">
        <h3>Sign up form</h3>
        <form onSubmit={this.handleSubmit} className="input">
          <div className="row mb-4">
            <div className="col">
              <label>Username</label>
              <input
                type="text"
                value={this.state.values.username}
                className="form-control"
                name="username"
                required
                onChange={this.handleChangeValue}
              />
              <span className="text text-danger">
                {this.state.error.username}
              </span>
            </div>
            <div className="col">
              <label>Full name</label>
              <input
                type="text"
                value={this.state.values.fullName}
                name="fullName"
                required
                onChange={this.handleChangeValue}
                className="form-control"
              />
              <span className="text text-danger">
                {this.state.error.fullName}
              </span>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label>Password</label>
              <input
                type="password"
                value={this.state.values.password}
                className="form-control"
                name="password"
                required
                onChange={this.handleChangeValue}
              />
              <span className="text text-danger">
                {this.state.error.password}
              </span>
            </div>
            <div className="col">
              <label>Phone number</label>
              <input
                type="text"
                value={this.state.values.phoneNumber}
                name="phoneNumber"
                required
                onChange={this.handleChangeValue}
                className="form-control"
              />
              <span className="text text-danger">
                {this.state.error.phoneNumber}
              </span>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label>Email</label>
              <input
                type="email"
                value={this.state.values.email}
                name="email"
                onChange={this.handleChangeValue}
                className="form-control"
              />
              <span className="text text-danger">{this.state.error.email}</span>
            </div>
            <div className="col">
              <label>User type</label>
              <select
                className="form-select"
                name="userType"
                value={this.state.values.userType}
                onChange={this.handleChangeValue}
              >
                <option defaultValue={"Regular customer"}>
                  Regular customer
                </option>
                <option value={"VIP customer"}>VIP customer</option>
                <option value={"Platinum customer"}>Platinum customer</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={() => {
                this.props.dispatch(
                  addUser(this.state.values, this.state.error)
                );
              }}
            >
              Sign up
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.props.dispatch(updateUser(this.state.values));
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userEdit.username !== this.props.userEdit.username) {
      this.setState({
        values: this.props.userEdit,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userEdit: state.UserManagementReducer.userEdit,
  };
};

export default connect(mapStateToProps)(Form);
