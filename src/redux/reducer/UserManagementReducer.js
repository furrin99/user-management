import { add_user, delete_user, edit_user, update_user } from "../type/type";

const stateDefault = {
  info: [],
  userEdit: {
    username: "abc123",
    fullName: "Bich Nguyen",
    password: "df@f1232",
    email: "bich@gmail.com",
    phoneNumber: "2343243242324",
    userType: "Regular customer",
  },
};

const UserManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case add_user: {
      let index = state.info.findIndex(
        (user) => user.username === action.user.username
      );
      const entries = Object.values(action.user);
      const errorEntries = Object.values(action.error);

      for (const value of entries) {
        if (value === "") {
          alert("Please fill in all information before submitting");
          return { ...state };
        }
      }
      for (const value of errorEntries) {
        if (value !== "") {
          alert(
            "Input invalid! Please make sure all information meet the requirements!"
          );
          return { ...state };
        }
      }
      if (index !== -1) {
        alert("User already exists");
        return { ...state };
      } else {
        alert("Submit successful!");
        state.info.push(action.user);
      }
      state.info = [...state.info];

      return { ...state };
    }
    case delete_user: {
      let infoUpdate = [...state.info];
      infoUpdate = infoUpdate.filter(
        (info) => info.username !== action.username
      );
      return { ...state, info: infoUpdate };
    }
    case edit_user: {
      return { ...state, userEdit: action.user };
    }
    case update_user: {
      state.userEdit = { ...state.userEdit };

      let userListUpdate = [...state.info];

      let index = userListUpdate.findIndex(
        (user) => user.username === state.userEdit.username
      );

      if (index !== -1) {
        userListUpdate[index] = { ...state.userEdit, ...action.user };
      }

      state.info = userListUpdate;
      state.userEdit = {
        username: "",
        fullName: "",
        password: "",
        email: "",
        phoneNumber: "",
        userType: "",
      };

      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default UserManagementReducer;
