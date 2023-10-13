import React, { Component } from "react";
import Form from "./Form";
import UserList from "./UserList";

export default class UserManagement extends Component {
  render() {
    return (
      <div>
        <Form />
        <UserList />
      </div>
    );
  }
}
