import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../redux/action/action";

class UserList extends Component {
  render() {
    return (
      <div className="container form">
        <h3>User List</h3>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Username</th>
                <th>Full name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>User type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.info.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.username}</td>
                    <td>{value.fullName}</td>
                    <td>{value.password}</td>
                    <td>{value.email}</td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.userType}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.props.dispatch(editUser(value));
                        }}
                        className="btn btn-primary me-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          this.props.dispatch(deleteUser(value.username));
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.UserManagementReducer.info,
  };
};
export default connect(mapStateToProps)(UserList);
