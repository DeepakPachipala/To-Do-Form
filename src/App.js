import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UserList";

function App() {
  const [usersList, setUsersList] = useState([]);

  // const deleteUser = (userId) => {
  //   // Call the deleteExpense function from the parent component with the expense ID
  //   console.log("APP.js:", userId);
  //   const updateuser = user.filter(obj => obj.id !== userId);
  //   console.log(updateUser)
  //   setExpenses(updateUser)
  //   // props.deleteExpense(expenseId)
  // };

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
